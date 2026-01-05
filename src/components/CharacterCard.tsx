import { Character } from "@/types";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const statusColors = {
    Alive: 'badge-success',
    Dead: 'badge-danger',
    unknown: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="card group hover:scale-102 transition-all! ease-in-out! duration-200! overflow-hidden cursor-pointer">
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
  );
};