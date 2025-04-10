"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PokemonCard from "./PokemonCard";

export default function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm.toLowerCase().trim());
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const { data: pokemonList } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1000"
      );
      return response.data.results;
    },
  });

  useEffect(() => {
    if (!debouncedTerm || !pokemonList) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const filteredResults = pokemonList.filter((pokemon) =>
        pokemon.name.includes(debouncedTerm)
      );

      const resultsWithIds = filteredResults.map((pokemon) => {
        const urlParts = pokemon.url.split("/");
        const id = parseInt(urlParts[urlParts.length - 2]);
        return { ...pokemon, id };
      });

      setSearchResults(resultsWithIds.slice(0, 10));
      setIsSearching(false);
    } catch (error) {
      setError("An error occurred while searching");
      setIsSearching(false);
    }
  }, [debouncedTerm, pokemonList]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokémon Search</h1>

      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pokémon by name..."
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        {isSearching && (
          <p className="text-center mt-2 text-gray-500">Searching...</p>
        )}
        {error && <p className="text-center mt-2 text-red-500">{error}</p>}
      </div>

      {debouncedTerm && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-10">
          <p className="text-gray-600">
            No Pokémon found matching "{debouncedTerm}"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {searchResults.map((pokemon) => (
          <PokemonCard key={pokemon.id} id={pokemon.id} />
        ))}
      </div>

      {!debouncedTerm && !isSearching && (
        <div className="text-center py-10">
          <p className="text-gray-600">Start typing to search for Pokémon</p>
        </div>
      )}
    </div>
  );
}
