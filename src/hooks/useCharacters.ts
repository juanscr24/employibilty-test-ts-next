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

  // Filtrar personajes
  const filteredCharacters = useMemo(() => {
    let result = [...characters];

    // Filtrar por nombre
    if (filters.name) {
      result = result.filter((char) =>
        char.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }

    // Filtrar por estado
    if (filters.status && filters.status !== 'all') {
      result = result.filter((char) => char.status === filters.status);
    }

    // Filtrar por especie
    if (filters.species) {
      result = result.filter((char) =>
        char.species.toLowerCase().includes(filters.species!.toLowerCase())
      );
    }

    // Filtrar por género
    if (filters.gender) {
      result = result.filter((char) => char.gender === filters.gender);
    }

    return result;
  }, [characters, filters]);

  // Calcular estadísticas
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
