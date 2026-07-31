import { CategoryManagement } from '@/dashboard/features/categories/CategoryManagement';
import FadeContent from '@/components/FadeContent';

export default function CategoriesPage() {
  return (
    <FadeContent duration={600} delay={0} threshold={0.1}>
      <CategoryManagement />
    </FadeContent>
  );
}
