'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Character } from '@/types';
import { useFavorites } from '@/hooks';
import { LoginModal } from './LoginModal';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const statusColors = {
    Alive: 'badge-success',
    Dead: 'badge-danger',
    unknown: 'bg-gray-100 text-gray-800',
  };

  const handleFavoriteClick = async () => {
    setIsPending(true);
    const ok = await toggleFavorite(character.id);
    if (!ok) {
      setShowLoginModal(true);
    }
    setIsPending(false);
  };

  const favorited = isFavorite(character.id);

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        characterName={character.name}
      />

      <div className="card group hover:scale-102 transition-all! ease-in-out! duration-200! overflow-hidden cursor-pointer relative">
        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          disabled={isPending}
          aria-label={favorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-200
            ${favorited
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-400 hover:bg-white shadow'
            }`}
        >
          <Heart
            size={18}
            className={favorited ? 'fill-current' : ''}
          />
        </button>

        <div className="relative h-64 bg-gray-200">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="card-body">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
            {character.name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`badge ${statusColors[character.status]}`}>
                {character.status}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Especie:</span> {character.species}
              </p>
              {character.type && (
                <p>
                  <span className="font-medium">Tipo:</span> {character.type}
                </p>
              )}
              <p>
                <span className="font-medium">Género:</span> {character.gender}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};