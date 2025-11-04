import React from 'react';
import type { Pokemon } from '../types';

interface PokemonSelectorProps {
  pokemonList: Pokemon[];
  selectedPokemon: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const PokemonSelector: React.FC<PokemonSelectorProps> = ({ pokemonList, selectedPokemon, onChange, disabled }) => {
  return (
    <div className="w-full">
      <label htmlFor="pokemon-select" className="block text-sm font-medium text-gray-300 mb-1">
        Choose a Pokémon:
      </label>
      <select
        id="pokemon-select"
        value={selectedPokemon}
        onChange={onChange}
        disabled={disabled}
        className="block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-white disabled:opacity-50"
      >
        <option value="" disabled>Select your Pokémon</option>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name}>
            #{pokemon.id} - {pokemon.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonSelector;
