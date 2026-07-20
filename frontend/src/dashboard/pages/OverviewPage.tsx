import { Activity, Camera, ChartColumn, FolderTree, ImageIcon, LayoutGrid, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { DashboardKpiCard } from '@/dashboard/components/organisms/DashboardKpiCard';
import { QuickActionCard } from '@/dashboard/components/organisms/QuickActionCard';
import { ActivityTimeline } from '@/dashboard/components/organisms/ActivityTimeline';
import { OverviewList } from '@/dashboard/components/organisms/OverviewList';
import { PublishingProgress } from '@/dashboard/components/organisms/PublishingProgress';
import { SystemHealthPanel } from '@/dashboard/components/organisms/SystemHealthPanel';

const kpiCards = [
  { icon: LayoutGrid, title: 'Total Potentials', value: '24', helperText: 'Across curated village experiences', trend: '+6%' },
  { icon: Sparkles, title: 'Published', value: '18', helperText: 'Live on the public map', trend: '+2' },
  { icon: FolderTree, title: 'Draft', value: '4', helperText: 'Awaiting review', trend: 'In queue' },
  { icon: ChartColumn, title: 'Categories', value: '8', helperText: 'Organized content groups', trend: 'Stable' },
  { icon: Camera, title: 'Media Library', value: '142', helperText: 'Images and gallery assets', trend: '+12' },
  { icon: TrendingUp, title: 'Views', value: '3.4k', helperText: 'Weekly audience reach', trend: '+18%' },
];

const quickActions = [
  { icon: Plus, title: 'New Potential', description: 'Draft a fresh destination or experience entry.' },
  { icon: FolderTree, title: 'New Category', description: 'Create a content group for your editorial themes.' },
  { icon: ImageIcon, title: 'Upload Media', description: 'Add images and assets to the library.' },
  { icon: ChartColumn, title: 'View Statistics', description: 'Review performance snapshots for the week.' },
];

const activityItems = [
  { icon: Sparkles, title: 'Published "Curug Cikoneng"', description: 'The latest destination story is now visible to visitors.', timestamp: '8 min ago', variant: 'teal' as const },
  { icon: Activity, title: 'Updated "UMKM Kopi"', description: 'Editorial details and media references were refreshed.', timestamp: '42 min ago' },
  { icon: FolderTree, title: 'Created "Kategori Wisata"', description: 'A new category was added for the editorial calendar.', timestamp: '1 hr ago' },
  { icon: Camera, title: 'Deleted "Old Gallery"', description: 'An outdated media collection was cleaned up.', timestamp: '3 hrs ago' },
];

const latestPotentials = [
  { title: 'Curug Cikoneng', meta: 'Waterfall experience • Updated today', badge: 'Live' },
  { title: 'UMKM Kopi', meta: 'Local craft and tasting destination', badge: 'Draft' },
  { title: 'Bukit Panorama', meta: 'Scenic lookout with sunrise views', badge: 'Review' },
];

const popularCategories = [
  { title: 'Wisata Alam', meta: '8 published entries', badge: 'Top' },
  { title: 'Kuliner', meta: '6 published entries', badge: 'Trending' },
  { title: 'Budaya', meta: '4 published entries', badge: 'Growing' },
];

const publishingItems = [
  { label: 'Published', value: 18, max: 24 },
  { label: 'Draft', value: 4, max: 24 },
  { label: 'Archived', value: 2, max: 24 },
];

export default function OverviewPage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      <section className="rounded-[1.5rem] border border-[#e6eae9] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,32,0.04)] md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">Dashboard overview</p>
            <h1 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-[#0f1720]">Good Morning, Administrator</h1>
            <p className="mt-3 text-sm leading-7 text-[#64748b]">Welcome back. Here's what's happening in your village content today.</p>
          </div>
          <div className="rounded-[1.1rem] border border-[#e6eae9] bg-[#f8faf9] px-4 py-3 text-sm text-[#0f1720]">
            <div className="font-medium">{today}</div>
            <div className="mt-1 text-[#64748b]">Last login • 08:45</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpiCards.map((card) => (
          <DashboardKpiCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <DashboardCard title="Quick actions" description="Start common administration tasks without leaving the workspace.">
          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Recent activity" description="Recent editorial changes and publishing updates.">
          <ActivityTimeline items={activityItems} />
        </DashboardCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <OverviewList title="Latest potentials" description="Fresh content entries in the pipeline." items={latestPotentials} />
        <OverviewList title="Popular categories" description="The most used editorial groupings this week." items={popularCategories} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <PublishingProgress items={publishingItems} />
        <SystemHealthPanel />
      </section>
    </div>
  );
}
