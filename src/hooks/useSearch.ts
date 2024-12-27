import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { searchContent } from '../services/tmdb';
import { useDebounce } from './useDebounce';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: searchResults, isLoading } = useQuery(
    ['search', debouncedSearch],
    () => searchContent(debouncedSearch),
    {
      enabled: debouncedSearch.length > 0,
      keepPreviousData: true,
      select: (data) => data.results.slice(0, 8),
    }
  );

  useEffect(() => {
    setIsSearchOpen(debouncedSearch.length > 0 && !!searchResults?.length);
  }, [debouncedSearch, searchResults]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    isSearchOpen,
    setIsSearchOpen,
  };
};