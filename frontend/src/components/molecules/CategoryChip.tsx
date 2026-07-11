import { MapPin, Tractor, Store, Music, Image as ImageIcon } from 'lucide-react';
import { Chip } from '@/components/atoms/Chip';
import type { Category } from '@/types/Category';

export interface CategoryChipProps {
  category: Category;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Maps a category icon string to a Lucide icon component.
 */
function getIconForCategory(iconName: string | null) {
  switch (iconName) {
    case 'map': return <MapPin className="w-4 h-4" />;
    case 'tractor': return <Tractor className="w-4 h-4" />;
    case 'store': return <Store className="w-4 h-4" />;
    case 'music': return <Music className="w-4 h-4" />;
    default: return <ImageIcon className="w-4 h-4" />;
  }
}

/**
 * CategoryChip - Specialized Chip displaying a category with its icon.
 */
export function CategoryChip({ category, active = false, onClick, className }: CategoryChipProps) {
  return (
    <Chip
      active={active}
      onClick={onClick}
      icon={getIconForCategory(category.icon_key)}
      className={className}
      aria-pressed={active}
    >
      {category.label}
    </Chip>
  );
}
