# Code Review Guidelines

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Code Review Philosophy

Code review is a collaborative gatekeeping phase designed to maintain codebase health, share domain knowledge, and ensure alignment with our engineering architecture before changes enter the production branch.

### 1.1. Core Review Values
- **Quality over Speed:** We do not rush code merges. Maintaining clean design system tokens and ACA compliance on day one is far less expensive than paying off technical debt later.
- **Constructive Communication:** Review comments must target the code, not the developer. Focus comments on structural improvements and architectural rationale.
- **Consistency Enforcement:** Code reviews ensure that naming conventions, file paths, and coding rules are followed uniformly across the stack.
- **Collective Ownership:** The reviewer shares responsibility for the code they approve. If it breaks on staging, both developer and reviewer collaborate to fix it.

---

## 2. Review Workflow

The software review cycle follows six distinct gating phases:

```
[ Developer / AI Coding ]
           ↓
[ Self-Review Checklist ]
           ↓
[ Static Analysis Checks (Linter/Pint/TSC) ]
           ↓
[ Peer Code Review (GitHub PR) ]
           │
           ├── (Changes Requested) ──> [ Refactor & Fix ] ──┐
           │                                                 │
           └── (Approved)                                    │
                 ↓                                           │
[ Merge to Staging/Main Branch ] <───────────────────────────┘
```

1. **Self-Review:** The developer (or AI assistant) runs local validation tests, formatting checks, and audits the code using the self-review checklists before pushing to GitHub.
2. **Static Analysis Gating:** Automated GitHub Actions run code linters (`ESLint`), type compilers (`tsc --noEmit`), and Laravel Pint checks. Any formatting warning blocks review progression.
3. **Peer Review:** A minimum of one developer (or technical architect) reviews the Pull Request. They audit coding logic, ACA compliance, security parameters, and business logic.
4. **Iterative Adjustments:** The developer updates code based on review feedback. Once resolved, the reviewer issues an "Approved" vote.
5. **Merge Gating:** The branch is merged into the staging branch for automated builds.
6. **Post-Merge Verification:** Call the `/api/v1/health` check endpoint and run a manual staging validation pass.

---

## 3. Review Scope & Checklists

### 3.1. Business Logic Review
- **Validation:** Match the code changes against the `BUSINESS_RULES.md` and `ACCEPTANCE_CRITERIA.md` constraints.
- **Rule Check:** Ensure that default parameters (like fallback WhatsApp contact numbers) follow defined priorities (Merchant $\rightarrow$ Village Contact).
- **Status Gating:** Ensure that draft entries are never query-returned to public page listings.

### 3.2. Frontend Component Review
- **Design System Match:** Confirm that no custom colors, padding values, or fonts are hardcoded. All UI code must leverage standard Tailwind tokens.
- **Component Reusability:** Block the creation of duplicate icons, buttons, or input forms. Reuse Atoms and Molecules from `components/` instead.
- **Adaptive Render:** Verify that potential details compile using TPL-03 templates that dynamically iterate metadata values (ACA compliant).
- **Responsive Layouts:** Verify that the component layouts resize properly across mobile, tablet, and desktop breakpoints.

### 3.3. Backend & Service Layer Review
- **Service Layer Isolation:** Verify that controllers contain zero business logic. Database calculations and file optimization must live in Service classes.
- **Database Transactions:** Check that database operations altering multiple tables (e.g. potentials and coordinates) are wrapped in `DB::transaction` blocks.
- **Form Request Validation:** Ensure all controller inputs pass through request classes. Empty inputs must be rejected early.

### 3.4. Database & API Review
- **Index Presence:** Confirm that search columns (`slug`, `status`, `category_id`, coordinates) contain indexes in the migrations.
- **Cascade Controls:** Verify that foreign keys define `onDelete('restrict')` or `onDelete('cascade')` rules explicitly.
- **API Response Shape:** Check that success responses return JSON matching the `API_SPEC.md` format.
- **Eager Loading:** Ensure lists load relations (`with(['category', 'location'])`) to prevent N+1 performance lag.

---

## 4. Security Audit Parameters

Reviewers must inspect code files for these security concerns:
- **Parameter Binding:** Database queries must use Eloquent ORM bindings. Direct SQL string concatenation is strictly prohibited.
- **Output Escaping:** Check that frontend components escape inputs dynamically (preventing XSS).
- **Sanctum Verification:** Verify that admin write routes are wrapped in `auth:sanctum` middleware blocks.
- **File Upload Guard:** Verify image uploads validate size limits (max 5MB), restrict MIME types to a whitelist, and generate UUID filenames.

---

## 5. Accessibility Audit Parameters (WCAG 2.1 AA)

- **Keyboard Focus:** Ensure that interactive elements are focusable via the `Tab` key and display a visible `2px` focus ring.
- **Touch Target Size:** Confirm mobile targets maintain a minimum size of `44px × 44px`.
- **Screen Reader Support:** Interactive icons must carry descriptive `aria-label` tags, and images must include semantic `alt` attributes.

---

## 6. AI-Generated Code Verification (Mandatory)

Reviewers must audit code generated by AI coding assistants (Cursor, Claude Code, etc.) against these rules:
- **No Invented APIs:** Did the AI assistant reuse documented API paths, or did it invent new routes?
- **No Hardcoded Configs:** Did the AI assistant build hardcoded category loops, or did it leverage the database-driven ACA schema?
- **Component Duplication:** Did the AI write a new card component instead of importing `UnifiedPotentialCard.tsx`?
- **Doc Alignment:** Does the output follow the naming casing, database model scopes, and testing parameters?

---

## 7. Common Review Anti-Patterns to Avoid

- **Approve Without Reading:** Approving a pull request within minutes based on description text only.
- **Syntax Nitpicking:** Focusing on minor spacing issues (which automated tools like ESLint and Laravel Pint handle) instead of checking logical issues (like database transactions, N+1 queries, or security vulnerabilities).
- **Ignoring Edge Cases:** Bypassing validation checks for error states, empty search returns, or slow network environments.

---

## 8. Pull Request Merge Criteria

A Pull Request is permitted to merge only when it satisfies these requirements:

1. **Linter Check:** GitHub Actions ESLint, Prettier, and Laravel Pint builds pass with zero warnings.
2. **Build Success:** React production build (`npm run build`) runs without compiler errors.
3. **Tests Pass:** vitest and PHPUnit tests complete successfully, maintaining $\ge 80\%$ code coverage.
4. **Peer Approval:** A minimum of one peer reviewer issues an "Approved" status.
5. **No Schema Breaks:** Database migration rollbacks have been verified as safe.
6. **Documentation Updated:** Any changed API endpoints or system variables are updated in the docs folder.
