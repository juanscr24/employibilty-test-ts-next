'use client';

import { useCharacters } from '@/hooks';
import { LoadingCard } from '@/components/Loading';
import { ErrorMessage, EmptyState } from '@/components/ErrorState';
import { CharacterCard, StatCard, FiltersPanel } from '@/components';
import DashboardHeader from '@/components/DashboardHeader';
import { CircleCheck, CircleQuestionMark, CircleX, Users } from 'lucide-react';

export default function DashboardPage() {
  const {
    filteredCharacters,
    stats,
    isLoading,
    error,
    filters,
    setFilters,
    refetch,
  } = useCharacters();

  // Loading State
  if (isLoading) {
    return (
      <div className="container-custom py-6">
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <LoadingCard count={8} />
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6! flex justify-center">
      <div className="w-7/10 max-lg:w-8/10 max-md:w-9/10 py-8 flex flex-col gap-4">
        {/* Header */}
        <DashboardHeader title='Dashboard de Personajes' subtitle='Explora los personajes de Rick and Morty'/>
        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total"
            value={stats.total}
            color="blue"
            icon={
              <Users />
            }
          />
          <StatCard
            title="Vivos"
            value={stats.alive}
            color="green"
            icon={
              <CircleCheck />
            }
          />
          <StatCard
            title="Muertos"
            value={stats.dead}
            color="red"
            icon={
              <CircleX />
            }
          />
          <StatCard
            title="Desconocidos"
            value={stats.unknown}
            color="gray"
            icon={
              <CircleQuestionMark />
            }
          />
        </div>

        {/* Filtros */}
        <FiltersPanel
          filters={filters}
          setFilters={setFilters}
          filteredCharacters={filteredCharacters}
          stats={stats}
        />

        {/* Lista de personajes */}
        {filteredCharacters.length === 0 ? (
          <EmptyState
            title="No se encontraron personajes"
            description="Intenta ajustar los filtros de búsqueda"
            action={{
              label: 'Limpiar filtros',
              onClick: () => setFilters({ name: '', status: 'all' }),
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

