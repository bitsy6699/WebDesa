import { type FormEvent, useState } from 'react';
import { SearchInput } from '@/components/atoms/SearchInput';
import { Button } from '@/components/atoms/Button';
import { clsx } from 'clsx';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  /** `hero` renders a larger, prominent search bar for the hero section. */
  variant?: 'default' | 'hero';
  className?: string;
}

/**
 * SearchBar — Molecule combining SearchInput and a submit Button.
 *
 * Variants:
 * - default: compact, inline search bar (used in Directory toolbar)
 * - hero: large, prominent search bar (used in HeroBanner)
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.3 Global Search Bar
 */
export function SearchBar({
  placeholder = 'Cari potensi desa...',
  onSearch,
  variant = 'default',
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const isHero = variant === 'hero';

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Cari potensi desa"
      className={clsx(
        'flex items-center',
        isHero
          ? 'w-full max-w-2xl rounded-[--radius-2xl] bg-white/95 backdrop-blur-sm shadow-[var(--shadow-xl)] overflow-hidden p-1.5 gap-1'
          : 'w-full max-w-lg gap-2',
        className,
      )}
    >
      <SearchInput
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Kata kunci pencarian"
        className={clsx(
          'flex-1',
          isHero && 'border-0 shadow-none bg-transparent focus:ring-0 text-[--neutral-900] text-base',
        )}
      />
      <Button
        type="submit"
        variant="primary"
        size={isHero ? 'lg' : 'md'}
        className={isHero ? 'rounded-[--radius-xl] shrink-0' : 'shrink-0'}
      >
        {isHero ? 'Cari Sekarang' : 'Cari'}
      </Button>
    </form>
  );
}
