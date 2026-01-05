'use client';

import { useCharacters } from '@/hooks';
import { LoadingSpinner } from '@/components/Loading';
import { ErrorMessage } from '@/components/ErrorState';
import { Character } from '@/types';

export default function Home() {
  const { filteredCharacters, isLoading, error, refetch } = useCharacters();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className='min-h-screen bg-gray-50 py-6! flex justify-center'>
      <div className="w-7/10 max-lg:w-8/10 max-md:w-9/10 py-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-6">Personajes de Rick & Morty</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character: Character) => (
            <div key={character.id} className="card overflow-hidden">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-64 object-cover"
              />
              <div className="card-body">
                <h3 className="font-bold text-lg mb-2">{character.name}</h3>
                <p className="text-sm text-gray-600">
                  {character.species} - {character.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
