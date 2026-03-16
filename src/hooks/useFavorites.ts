'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/libs/axios';
import { useAuthContext } from '@/contexts/AuthContext';

export const useFavorites = () => {
  const { isAuthenticated } = useAuthContext();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setFavorites([]);
      return;
    }

    setIsLoading(true);
    apiClient
      .get<{ character_id: number }[]>('/favorites')
      .then((res) => setFavorites(res.data.map((f) => f.character_id)))
      .catch(() => setFavorites([]))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  const isFavorite = useCallback(
    (characterId: number) => favorites.includes(characterId),
    [favorites]
  );

  /**
   * Returns true if the operation succeeded, false if the user is not logged in.
   */
  const toggleFavorite = useCallback(
    async (characterId: number): Promise<boolean> => {
      if (!isAuthenticated) return false;

      try {
        if (favorites.includes(characterId)) {
          await apiClient.delete(`/favorites/${characterId}`);
          setFavorites((prev) => prev.filter((id) => id !== characterId));
        } else {
          await apiClient.post('/favorites', { characterId });
          setFavorites((prev) => [...prev, characterId]);
        }
        return true;
      } catch {
        return false;
      }
    },
    [favorites, isAuthenticated]
  );

  return { favorites, isFavorite, toggleFavorite, isLoading };
};
