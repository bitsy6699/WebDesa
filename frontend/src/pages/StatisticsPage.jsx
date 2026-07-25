import { lazy, memo, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Home, TrendingUp, Leaf, Store, MapPin, Star, Layers } from 'lucide-react';
import { useStatistics } from '@/hooks/useStatistics';
import { buildMetricItems, CountUp } from '@/components/organisms/statistics/utils';
import SEO from '@/components/SEO';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/structuredData';
import { PageHero } from '@/components/molecules/PageHero';
import { PageSection } from '@/components/molecules/PageSection';
import { PageCTA } from '@/components/molecules/PageCTA';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DoughnutChart = lazy(async () => {
  const { Doughnut } = await import('react-chartjs-2');
  return { default: Doughnut };
});

const BarChart = lazy(async () => {
  const { Bar } = await import('react-chartjs-2');
  return { default: Bar };
});

/* ── Highlight card ──────────────────────────────────────────────── */

const HIGHLIGHT_ICONS = {
  'Total Potensi': Star,
  'Total Kategori': Layers,
  'Total UMKM': Store,
  'Total Dusun': Home,
};

const HighlightCard = memo(function HighlightCard({ label, value, delay }) {
  const Icon = HIGHLIGHT_ICONS[label] || TrendingUp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.4, delay }}
      className="relative overflow-hidden rounded-[24px] border border-primary/10 bg-white p-6 shadow-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-center w-11 h-11 rounded-[12px] bg-primary/8 text-primary">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="font-heading text-[1.5rem] sm:text-[2rem] font-bold text-primary leading-none tracking-tight">
          {CountUp(value, true)}
        </p>
        <p className="mt-2 text-sm text-neutral-500 font-medium">{label}</p>
      </div>
    </motion.div>
  );
});

/* ── Insight block ───────────────────────────────────────────────── */

function InsightBlock({ icon: Icon, text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex gap-4 items-start"
    >
      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-[12px] bg-primary/8 text-primary">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <p className="text-[15px] text-neutral-600 leading-relaxed pt-2">{text}</p>
    </motion.div>
  );
}

/* ── Chart card ──────────────────────────────────────────────────── */

function ChartCard({ title, description, explanation, children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="rounded-[24px] border border-primary/10 bg-white p-6 shadow-sm"
    >
      <div className="mb-5">
        <h3 className="font-heading text-lg font-bold text-primary-dark">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      </div>
      <div className="h-64">{children}</div>
      {explanation && (
        <p className="mt-4 text-xs text-neutral-400 leading-relaxed border-t border-neutral-100 pt-4">{explanation}</p>
      )}
    </motion.div>
  );
}

/* ── Distribution item ───────────────────────────────────────────── */

function DistributionItem({ label, value, maxValue, delay }) {
  const pct = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-600">{label}</span>
        <span className="text-sm font-semibold text-primary">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-primary/8 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary/60"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </motion.div>
  );
}

/* ── Loading / Empty states ──────────────────────────────────────── */

function LoadingState() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-[720px] px-5 sm:px-6 lg:px-8 space-y-6">
        <div className="h-20 rounded-[24px] bg-neutral-100 animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 rounded-[24px] bg-neutral-100 animate-pulse" />
          ))}
        </div>
        <div className="h-48 rounded-[24px] bg-neutral-100 animate-pulse" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-[560px] px-5 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/8 text-primary mb-6">
          <BarChart3 className="h-9 w-9" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-primary">Data Sedang Disiapkan</h3>
        <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
          Statistik desa sedang dalam proses pengumpulan. Sementara itu, jelajahi potensi desa yang sudah tersedia.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-600 transition-colors"
        >
          <Home className="h-4 w-4" />
          Jelajahi Potensi
        </Link>
      </div>
    </div>
  );
}

/* ── Generate insights from data ─────────────────────────────────── */

function generateInsights(summary) {
  const t = summary?.total_potentials ?? 0;
  const c = summary?.total_categories ?? 0;
  const u = summary?.total_umkm ?? 0;
  const d = summary?.total_dusun ?? 0;
  const avg = c > 0 ? (t / c).toFixed(1) : '0';

  const insights = [];

  if (t > 0 && c > 0) {
    insights.push({
      icon: TrendingUp,
      text: `Desa Karamatwangi memiliki ${t} potensi tersebar di ${c} kategori, dengan rata-rata ${avg} potensi per kategori — menunjukkan keberagaman sektor yang patut diperhatikan.`,
    });
  }
  if (u > 0) {
    insights.push({
      icon: Store,
      text: `Terdapat ${u} UMKM aktif yang menjadi tulang punggung ekonomi warga. Setiap usaha merepresentasikan semangat kemandirian komunitas desa.`,
    });
  }
  if (d > 0) {
    insights.push({
      icon: MapPin,
      text: `${d} dusun di Desa Karamatwangi sudah tercatat dalam sistem, memastikan setiap wilayah mendapat perhatian yang setara dalam pembangunan.`,
    });
  }
  if (t > 0 && u > 0) {
    insights.push({
      icon: Leaf,
      text: `Dengan ${t} potensi dan ${u} UMKM, desa ini memiliki fondasi kuat untuk pertumbuhan ekonomi berkelanjutan di tahun-tahun mendatang.`,
    });
  }

  return insights;
}

/* ── Main page ───────────────────────────────────────────────────── */

export default function StatisticsPage() {
  const { data, isLoading, isError } = useStatistics();

  const metrics = useMemo(() => buildMetricItems(data), [data]);
  const insights = useMemo(() => generateInsights(data), [data]);

  const donutData = useMemo(() => ({
    labels: ['Potensi', 'Kategori', 'UMKM', 'Dusun'],
    datasets: [{
      data: [
        data?.total_potentials ?? 0,
        data?.total_categories ?? 0,
        data?.total_umkm ?? 0,
        data?.total_dusun ?? 0,
      ],
      backgroundColor: ['#184D47', '#D97706', '#A7C957', '#6B7280'],
      borderColor: '#ffffff',
      borderWidth: 2,
    }],
  }), [data]);

  const barData = useMemo(() => ({
    labels: ['Potensi', 'Kategori', 'UMKM', 'Dusun'],
    datasets: [{
      label: 'Jumlah',
      data: [
        data?.total_potentials ?? 0,
        data?.total_categories ?? 0,
        data?.total_umkm ?? 0,
        data?.total_dusun ?? 0,
      ],
      backgroundColor: ['#184D47', '#D97706', '#A7C957', '#6B7280'],
      borderRadius: 12,
    }],
  }), [data]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  }), []);

  const hasData = metrics.some((item) => item.value > 0);
  const hasCharts = donutData.datasets[0].data.some((v) => v > 0);

  const maxValue = useMemo(() => {
    const vals = metrics.map((m) => m.value);
    return vals.length > 0 ? Math.max(...vals) : 0;
  }, [metrics]);

  if (isLoading) {
    return (
      <>
        <SEO title="Potret Desa dalam Angka" description="Data dan statistik potensi Desa Karamatwangi." path="/statistics" image="/hero/hero-karamatwangi.jpg"
          schema={[
            collectionPageSchema('Statistik Desa Karamatwangi', 'Data dan statistik potensi Desa Karamatwangi.', '/statistics'),
            breadcrumbSchema([{ label: 'Beranda', to: '/' }, { label: 'Statistik' }]),
          ]}
        />
        <PageHero
          title="Potret Desa dalam Angka"
          description="Menyiapkan data desa untuk Anda..."
          variant="statistics"
          breadcrumb={[{ label: 'Beranda', to: '/' }, { label: 'Statistik' }]}
        />
        <LoadingState />
      </>
    );
  }

  if (isError || !hasData) {
    return (
      <>
        <SEO title="Potret Desa dalam Angka" description="Data dan statistik potensi Desa Karamatwangi." path="/statistics" image="/hero/hero-karamatwangi.jpg"
          schema={[
            collectionPageSchema('Statistik Desa Karamatwangi', 'Data dan statistik potensi Desa Karamatwangi.', '/statistics'),
            breadcrumbSchema([{ label: 'Beranda', to: '/' }, { label: 'Statistik' }]),
          ]}
        />
        <PageHero
          title="Potret Desa dalam Angka"
          description="Menyiapkan data desa untuk Anda..."
          variant="statistics"
          breadcrumb={[{ label: 'Beranda', to: '/' }, { label: 'Statistik' }]}
        />
        <EmptyState />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Potret Desa dalam Angka"
        description="Data dan statistik potensi Desa Karamatwangi — jumlah potensi, UMKM, kategori, dan dusun."
        path="/statistics"
        image="/hero/hero-karamatwangi.jpg"
        schema={[
          collectionPageSchema('Statistik Desa Karamatwangi', 'Data dan statistik potensi Desa Karamatwangi — jumlah potensi, UMKM, kategori, dan dusun.', '/statistics'),
          breadcrumbSchema([{ label: 'Beranda', to: '/' }, { label: 'Statistik' }]),
        ]}
      />

      {/* ── 1. Hero ─────────────────────────────────────── */}
      <PageHero
        title="Potret Desa dalam Angka"
        description="Setiap angka punya cerita. Data ini adalah potret nyata kehidupan Desa Karamatwangi."
        variant="statistics"
        breadcrumb={[{ label: 'Beranda', to: '/' }, { label: 'Statistik' }]}
      />

      {/* ── 2. Highlight Numbers ────────────────────────── */}
      <PageSection>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((item, i) => (
            <HighlightCard
              key={item.label}
              label={item.label}
              value={item.value}
              delay={i * 0.05}
            />
          ))}
        </div>
      </PageSection>

      {/* ── 3. Insight Section ──────────────────────────── */}
      {insights.length > 0 && (
        <PageSection>
          <div className="max-w-[720px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                Wawasan Data
              </p>
              <h2 className="font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-primary-dark sm:text-[1.75rem]">
                Apa Arti Angka-Angka Ini?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-neutral-500 max-w-[620px]">
                Data bukan sekadar jumlah — ini adalah cerita tentang desa kita.
              </p>
            </motion.div>
            <div className="space-y-6">
              {insights.map((insight, i) => (
                <InsightBlock
                  key={i}
                  icon={insight.icon}
                  text={insight.text}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>
        </PageSection>
      )}

      {/* ── 4. Charts ───────────────────────────────────── */}
      <PageSection>
        <div className="grid gap-6 lg:grid-cols-2">
          {hasCharts ? (
            <>
              <ChartCard
                title="Distribusi Data"
                description="Proporsi masing-masing indikator utama desa."
                explanation="Bagan menunjukkan perbandingan relatif antara potensi, kategori, UMKM, dan dusun yang sudah tercatat."
                delay={0}
              >
                <Suspense fallback={<div className="h-full animate-pulse rounded-2xl bg-neutral-100" />}>
                  <DoughnutChart data={donutData} options={chartOptions} />
                </Suspense>
              </ChartCard>

              <ChartCard
                title="Perbandingan Kuantitas"
                description="Jumlah absolut dari setiap indikator."
                explanation="Visualisasi ini membantu memahami skala masing-masing sektor secara langsung."
                delay={0.08}
              >
                <Suspense fallback={<div className="h-full animate-pulse rounded-2xl bg-neutral-100" />}>
                  <BarChart data={barData} options={chartOptions} />
                </Suspense>
              </ChartCard>
            </>
          ) : (
            <div className="lg:col-span-2 rounded-[24px] border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center text-sm text-neutral-400">
              Tidak ada data chart yang tersedia saat ini.
            </div>
          )}
        </div>
      </PageSection>

      {/* ── 5. Distribution ─────────────────────────────── */}
      <PageSection>
        <div className="max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Perbandingan
            </p>
            <h2 className="font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-primary-dark sm:text-[1.75rem]">
              Distribusi per Indikator
            </h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-neutral-500 max-w-[620px]">
              Perbandingan proporsi setiap sektor terhadap keseluruhan data.
            </p>
          </motion.div>

          <div className="space-y-5">
            {metrics.map((item, i) => (
              <DistributionItem
                key={item.label}
                label={item.label}
                value={item.value}
                maxValue={maxValue}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </PageSection>

      {/* ── 6. CTA ──────────────────────────────────────── */}
      <PageCTA
        title="Ingin Lebih Dekat dengan Desa Karamatwangi?"
        description="Angka hanyalah titik awal. Jelajahi langsung potensi dan keindahan yang dimiliki desa ini."
        ctaTo="/potentials"
        ctaLabel="Jelajahi Potensi"
        ctaTo2="/about"
        ctaLabel2="Tentang Desa"
        variant="light"
      />
    </>
  );
}
