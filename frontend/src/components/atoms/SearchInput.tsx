import { forwardRef, type InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';
import { Input } from './Input';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

/**
 * SearchInput - Specialized input for search fields.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        icon={<Search className="w-5 h-5" />}
        className={clsx('max-w-md', className)}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';
