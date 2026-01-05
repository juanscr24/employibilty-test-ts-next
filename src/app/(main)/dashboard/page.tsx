'use client';

import { useCharacters } from '@/hooks';
import { LoadingCard } from '@/components/Loading';
import { ErrorMessage, EmptyState } from '@/components/ErrorState';
import { CharacterCard, StatCard, FiltersPanel } from '@/components';
import DashboardHeader from '@/components/DashboardHeader';

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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            }
          />
          <StatCard
            title="Vivos"
            value={stats.alive}
            color="green"
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          <StatCard
            title="Muertos"
            value={stats.dead}
            color="red"
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          <StatCard
            title="Desconocidos"
            value={stats.unknown}
            color="gray"
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
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

