import React from "react";
import { TypeBadge, TeraTypeBadge } from "./TypeBadges";

const PokemonCard = ({ pokemon }) => {
  const evString = Object.entries(pokemon.evs)
    .filter(([, value]) => value > 0)
    .map(([stat, value]) => `${value} ${stat.toUpperCase()}`)
    .join(" / ");

  const ivString = pokemon.ivs
    ? Object.entries(pokemon.ivs)
        .map(([stat, value]) => `${value} ${stat.toUpperCase()}`)
        .join(", ")
    : "Tudo 31";

  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <div className="flex items-start space-x-4">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-24 h-24 bg-gray-700 rounded-full border-2 border-gray-600 mt-1"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/96x96/4B5563/FFFFFF?text=${pokemon.name.substring(
              0,
              1
            )}`;
          }}
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{pokemon.name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
          <div className="mt-2">
            <TeraTypeBadge type={pokemon.teraType} />
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-3 text-gray-300 flex-grow text-sm">
        <p>
          <span className="font-semibold text-gray-400">Nature:</span>{" "}
          {pokemon.nature}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Habilidade:</span>{" "}
          {pokemon.ability}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Item:</span>{" "}
          {pokemon.item}
        </p>
        <div>
          <p className="font-semibold text-gray-400 mb-1">EVs:</p>
          <p className="bg-gray-700/50 px-2 py-1 rounded-md">{evString}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-400 mb-1">IVs:</p>
          <p className="bg-gray-700/50 px-2 py-1 rounded-md">{ivString}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-400 mb-1">Golpes:</p>
          <ul className="grid grid-cols-2 gap-1">
            {pokemon.moves.map((move) => (
              <li
                key={move}
                className="bg-gray-700 px-2 py-1 rounded-md text-center"
              >
                {move}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
