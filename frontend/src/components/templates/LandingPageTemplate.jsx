import { CTASection } from '@/components/organisms/CTASection';
import { StoryDivider } from '@/components/organisms/StoryDivider';

export function LandingPageTemplate({
  hero,
  about,
  categories,
  featured,
  news,
  statistics,
  mapPreview,
  faq,
  contact,
}) {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Chapter 1 — Welcome: Hero — #0F3D34 */}
      {hero}

      {/* Chapter 2 — Nature: About — #FFFFFF */}
      {about}

      {/* Interstitial — poetic breathing moment */}
      <StoryDivider
        title="Di sinilah alam bercerita tentang ketenangan."
        subtitle="Dataran Tinggi Garut"
        variant="sage"
        showIcon
      />

      {/* Chapter 3 — Village Life: Featured + Categories — #F3F8F5 / #FFF */}
      {featured}
      {categories}

      {/* Chapter 4 — Explore: Map + Statistics — #FFF / #0F3D34 */}
      {mapPreview}
      {statistics}

      {/* Chapter 5 — Community: Latest + FAQ — #FFF */}
      {news}
      {faq}

      {/* Chapter 6 — Connect: Contact + CTA — #FAFBFA / #184D47 */}
      {contact}

      <CTASection id="eksplorasi" />
    </div>
  );
}
