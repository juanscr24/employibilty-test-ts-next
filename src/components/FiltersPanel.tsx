import { Character, CharacterFilters, CharacterStats } from '@/types';

interface FiltersPanelProps {
  filters: CharacterFilters;
  setFilters: (filters: CharacterFilters) => void;
  filteredCharacters: Character[];
  stats: CharacterStats;
}

export const FiltersPanel = ({
  filters,
  setFilters,
  filteredCharacters,
  stats,
}: FiltersPanelProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, status: e.target.value as any });
  };

  const clearFilters = () => {
    setFilters({ name: '', status: 'all' });
  };

  return (
    <div className="card mb-6">
      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="label">Buscar personaje</label>
            <input
              type="text"
              className="input"
              placeholder="Buscar por nombre..."
              value={filters.name || ''}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <label className="label">Filtrar por estado</label>
            <select
              className="input"
              value={filters.status || 'all'}
              onChange={handleStatusChange}
            >
              <option value="all">Todos</option>
              <option value="Alive">Vivos</option>
              <option value="Dead">Muertos</option>
              <option value="unknown">Desconocidos</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>
            Mostrando <strong>{filteredCharacters.length}</strong> de{' '}
            <strong>{stats.total}</strong> personajes
          </span>
          {(filters.name || filters.status !== 'all') && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
