# Content Guidelines Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. General Writing Principles & Formatting

To ensure the platform remains professional, clean, and accessible, administrators and content editors must follow these formatting rules:

- **Writing Style:** Active, informative, and engaging. Write in the present tense (e.g. *"Desa Karamatwangi menawarkan..."* instead of *"Telah ditawarkan oleh desa..."*).
- **Sentence Structure:** Keep sentences short and clear (maximum 20 words per sentence). Avoid complex compound sentences.
- **Paragraph Length:** Restrict paragraphs to 3–4 sentences (maximum 80 words) to ensure readability on mobile screens.
- **Capitalization:** Use Title Case for headers, buttons, and page titles. Use Sentence Case for normal body paragraphs and listings descriptions.
- **Punctuation:** Always end complete sentences with a period. Use exclamation marks very sparingly.
- **Numbers:** Write numbers from zero to nine as words (e.g., *satu*, *dua*), and numbers 10 and above as digits (e.g., *12*, *105*).
- **Dates:** Write dates in standard Indonesian format: `DD MMMM YYYY` (e.g., *17 Agustus 2026*).
- **Address Format:** `Jalan / Kampung, RT/RW, Dusun, Desa Karamatwangi, Kecamatan Cikajang, Kabupaten Garut, Jawa Barat, 44171`.
- **Phone Format:** Must use the internationalized country code starting with `62` and contain no spaces or dashes (e.g., `628123456789`).
- **Email Format:** Always write in lowercase (e.g., `info@karamatwangi.desa.id`).
- **Website/Social Format:** Exclude `http://` or `https://` prefixes for display strings (e.g., `instagram.com/desa_karamatwangi` instead of `https://instagram.com/desa_karamatwangi`).

---

## 2. Brand Tone of Voice

- **Voice Attributes:** Friendly · Warm · Professional · Community-Oriented · Inviting
- **Anti-Jargon Rule:** Do not use heavy bureaucratic phrases, legal codes, or confusing administrative acronyms. If an official program must be mentioned, explain it simply.
- **Storytelling:** Focus on the people behind the businesses and attractions. Mention the craft's history, local heritage, or the farmer's hard work rather than dry technical specifications.

---

## 3. Homepage Content Rules

- **Hero Title:** Must be welcoming and broad. E.g., *"Selamat Datang di Desa Karamatwangi"* or *"Temukan Potensi, Produk, dan Keindahan Karamatwangi"*.
- **Hero Subtitle:** Describe the showcase purpose in 1–2 sentences. E.g., *"Jelajahi karya terbaik wirausaha lokal, keindahan alam pegunungan, dan kekayaan pertanian kami."*
- **Call To Action (CTA):** Focus on exploration. Use active labels: **"Jelajahi Potensi"** or **"Lihat Peta"**.
- **Featured Section:** Highlights entries marked as "Featured" in the CMS. Heading should read **"Produk & Destinasi Pilihan"**.
- **Statistics Text:** Displays numeric metrics with short, clean labels: **"Wirausaha Aktif"**, **"Destinasi Wisata"**, **"Kategori Potensi"**.
- **Map Introduction:** Slogan encouraging spatial navigation: **"Temukan Potensi di Sekitar Anda"** (Find potentials near you).
- **Footer Description:** Short summary of the village platform: *"Portal Showcase Digital Desa Karamatwangi untuk mengenalkan dan mendukung perekonomian serta pariwisata lokal."*

---

## 4. Village Profile Writing Standards

- **Village Overview:** A brief 2-paragraph summary of Desa Karamatwangi's location, climate, and main source of livelihood.
- **History:** Highlight the origin of the village name and major milestones in community development.
- **Vision & Mission:** Render the official vision and mission text in clean, bulleted formats.
- **Geography:** Describe the altitude, borders, temperature range, and layout (e.g., proximity to Mount Cikuray).
- **Population & Economy:** Simple paragraphs summarizing resident count, farming dominance, and local market operations.
- **Culture & Potential:** Describe local traditions, arts, and the core potentials showcased on this site.

---

## 5. Village Potential Content Standards (ACA Ready)

Every listing created in the CMS (UMKM in V1, Tourism/Agriculture in future phases) must follow this metadata schema configuration:

- **Title:** The official name of the business or spot (e.g., *Kopi Khas Karamatwangi*). Max 150 characters.
- **Slug:** Auto-generated from title, containing only lowercase letters, numbers, and dashes (e.g., `kopi-khas-karamatwangi`).
- **Short Description:** A one-sentence summary for card previews. Max 160 characters.
- **Long Description:** Complete narrative detail, including history, specialties, and business context.
- **Cover Image:** High-resolution primary photo of the product/location.
- **Gallery:** 3 to 6 secondary photos showing products, interior space, or production.
- **Category:** Assigned Category ID matching the ACA registry.
- **Tags:** Keyword tags separated by commas (e.g., *kopi, robusta, minuman*).
- **Location:** Complete physical address.
- **Coordinates:** Precise Latitude and Longitude values (captured via CMS map pin tool).
- **Operating Hours:** Open and close times (e.g., *Senin - Sabtu: 08:00 - 17:00*).
- **Facilities:** Bullet points listing visitor amenities (e.g., *Tempat Parkir, Toilet, Wifi*).
- **Featured Status:** Boolean toggle. Set to "True" to highlight on the homepage.
- **Contact Information:** Structured phone, email, marketplace link, and social handles.
- **SEO Metadata:** Meta title and description overrides.
- **Status:** Set to `Draft` during creation; toggle to `Published` once verified.
- **Published Date:** Auto-generated timestamp on publication.

---

## 6. Adaptive Contact Content Guidelines

Administrators must populate contact fields using these guidelines to ensure the F-PUB-12 Adaptive Contact system resolves links correctly:

1. **Enter Active Channels Only:** Do not enter placeholder numbers or inactive emails.
2. **Standardize Phone Inputs:** Enter phone numbers starting with `62` (e.g. `628123456789`). Do not include prefix `0` or country code `+` symbols.
3. **Implicit Fallback:** If a merchant lacks personal contact details, the administrator must **leave the merchant contact fields blank**. The system will automatically map the website's default village contact. Never manually duplicate the village phone number into the merchant's profile columns.

---

## 7. Image Guidelines

- **File Format:** JPEG, PNG, or WebP. WebP is highly recommended.
- **Aspect Ratio:** Card Cover: `16:9` (landscape). Detail Gallery: `4:3` or `16:9`.
- **Resolution:** Maximum width of `1920px` for uploads.
- **Compression:** Upload file limit: 5MB. The backend will compress files automatically to optimized WebP formats (see BR-MED-01).
- **Naming Convention:** Use kebab-case descriptive names (e.g., `umkm-kopi-karamatwangi-01.jpg`).
- **Alt Text:** Descriptive and non-redundant. E.g., `alt="Proses pemanggangan kopi robusta di desa Karamatwangi"` instead of `alt="Gambar kopi"`.

---

## 8. News Guidelines

- **Headline Rules:** Clear and informative, using active verbs. E.g., *"Desa Karamatwangi Memulai Panen Kopi Perdana Tahun Ini"*. Max 80 characters.
- **Body Structure:** Lead paragraph answering *Who, What, Where, When, and Why*. Followed by 2–3 detail paragraphs and a closing quote from community members.
- **Featured Image:** Aspect ratio `16:9`. Must show actual event photos.
- **Author:** Name of the administrator or village staff member publishing the post.

---

## 9. SEO & Metadata Guidelines

- **Meta Title:** `[Nama Potensi] — Potensi Desa Karamatwangi`. Max 60 characters.
- **Meta Description:** A brief teaser paragraph matching the listing's short description. Max 150 characters.
- **Keywords:** 5 to 8 relevant search terms.
- **Open Graph Image:** Set to use the primary cover image of the listing.

---

## 10. Publishing Workflow

```
[Draft] → [Review] → [Approved] → [Published] → [Archived]
```

1. **Draft:** Content is created by the editor. The listing is saved but is invisible to public visitors (BR-GEN-01).
2. **Review:** Listing is checked against the Content Review Checklist by the chief editor or village admin.
3. **Approved:** Validation passes, item is ready to go live.
4. **Published:** Status changed to "Published". The listing appears dynamically on the interactive map, directories, and statistics.
5. **Archived:** If a business closes or a page becomes irrelevant, change status to "Archived" to safely remove it from the public view while retaining historical records.

---

## 11. Content Review Checklist

Before toggling any content item status to "Published", the editor must verify:

- [ ] **Grammar & Spelling:** Text is free of spelling errors and colloquial slang.
- [ ] **Contact numbers:** Phone numbers start with `62` and contain no dashes or spaces.
- [ ] **Coordinates:** Latitude and longitude coordinates are populated and point inside the village boundaries.
- [ ] **Image optimization:** Images contain descriptive alt-text and are not blurry.
- [ ] **Category assignment:** Selected category matches the potential type.
- [ ] **Hierarchy:** Headings follow correct nested order (`H1` -> `H2` -> `H3` -> `H4`).
- [ ] **Adaptive Contact:** Fallback logic is tested by clicking the preview button in CMS.
- [ ] **Metadata:** Meta title and description are configured for SEO.
- [ ] **Featured toggle:** Featured status checked if intended for homepage highlight.
