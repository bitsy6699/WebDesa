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
      <section id="chapter-1">
        {hero}
      </section>

      <section id="chapter-2">
        {about}
      </section>

      <StoryDivider
        title="Di sinilah alam bercerita tentang ketenangan."
        subtitle="Dataran Tinggi Garut"
        variant="sage"
        showIcon
      />

      <section id="chapter-3">
        {featured}
        {categories}
      </section>

      <div id="chapter-4">
        {mapPreview}
        {statistics}
      </div>

      <section id="chapter-5">
        {news}
        {faq}
      </section>

      <section id="chapter-6">
        {contact}
        <CTASection id="eksplorasi" />
      </section>
    </div>
  );
}
