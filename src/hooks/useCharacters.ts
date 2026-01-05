import { useState, useEffect, useCallback, useMemo } from 'react';
import axiosInstance from '@/libs/axios';
import { Character, CharactersResponse, CharacterFilters, CharacterStats } from '@/types';

interface UseCharactersReturn {
  characters: Character[];
  filteredCharacters: Character[];
  stats: CharacterStats;
  isLoading: boolean;
  error: string | null;
  filters: CharacterFilters;
  setFilters: (filters: CharacterFilters) => void;
  refetch: () => Promise<void>;
}

export const useCharacters = (): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CharacterFilters>({
    name: '',
    status: 'all',
  });

  const fetchCharacters = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.get<CharactersResponse>('/character');
      setCharacters(response.data.results);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Error al cargar personajes';
      setError(errorMessage);
      console.error('Error fetching characters:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  // Characters filtered based on filters state
  const filteredCharacters = useMemo(() => {
    let result = [...characters];

    // Name filter
    if (filters.name) {
      result = result.filter((char) =>
        char.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      result = result.filter((char) => char.status === filters.status);
    }

    // Species filter
    if (filters.species) {
      result = result.filter((char) =>
        char.species.toLowerCase().includes(filters.species!.toLowerCase())
      );
    }

    // Gender filter
    if (filters.gender) {
      result = result.filter((char) => char.gender === filters.gender);
    }

    return result;
  }, [characters, filters]);

  // Character statistics
  const stats = useMemo((): CharacterStats => {
    const alive = characters.filter((c) => c.status === 'Alive').length;
    const dead = characters.filter((c) => c.status === 'Dead').length;
    const unknown = characters.filter((c) => c.status === 'unknown').length;

    return {
      total: characters.length,
      alive,
      dead,
      unknown,
    };
  }, [characters]);

  return {
    characters,
    filteredCharacters,
    stats,
    isLoading,
    error,
    filters,
    setFilters,
    refetch: fetchCharacters,
  };
};
