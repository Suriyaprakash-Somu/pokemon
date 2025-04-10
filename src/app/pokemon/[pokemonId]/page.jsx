"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { useState, use } from "react";
import getTypeGradient from "@/app/utils/getTypeGradient";
import getTypeColor from "@/app/utils/getTypeColor";
import getStatColor from "@/app/utils/getStatColor";
import Image from "next/image";

export default function PokemonDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { pokemonId } = resolvedParams;
  const id = parseInt(pokemonId);
  const [isShiny, setIsShiny] = useState(false);

  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      return response.data;
    },
  });

  const { data: species } = useQuery({
    queryKey: ["pokemon-species", id],
    enabled: !!pokemon,
    queryFn: async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      return response.data;
    },
  });

  const { data: evolutionData } = useQuery({
    queryKey: ["evolution-chain", species?.evolution_chain?.url],
    enabled: !!species?.evolution_chain?.url,
    queryFn: async () => {
      const response = await axios.get(species.evolution_chain.url);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-xl text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-xl text-red-500">Pokémon not found</p>
      </div>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  const ability = pokemon.abilities[0]?.ability.name || "";
  const formattedAbility =
    ability.charAt(0).toUpperCase() + ability.slice(1).replace("-", " ");

  const getFlavorText = () => {
    if (!species) return "No description available.";
    const englishEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    return englishEntry
      ? englishEntry.flavor_text.replace(/\f/g, " ")
      : "No description available.";
  };

  const getCategory = () => {
    if (!species)
      return primaryType.charAt(0).toUpperCase() + primaryType.slice(1);
    const englishGenus = species.genera.find(
      (genus) => genus.language.name === "en"
    );
    return englishGenus
      ? englishGenus.genus.replace(" Pokémon", "")
      : primaryType.charAt(0).toUpperCase() + primaryType.slice(1);
  };

  const getTypeWeaknesses = () => {
    const typeWeaknesses = {
      fire: ["water", "rock", "ground"],
      water: ["electric", "grass"],
      grass: ["fire", "ice", "flying", "bug", "poison"],
      electric: ["ground"],
      normal: ["fighting"],
      bug: ["fire", "flying", "rock"],
      poison: ["ground", "psychic"],
    };
    return typeWeaknesses[primaryType] || [];
  };

  const getEvolutionChain = () => {
    if (!evolutionData) return [];
    const evoChain = [];
    let currentEvo = evolutionData.chain;
    while (currentEvo) {
      const evoDetails = currentEvo.species;
      const pokemonId = evoDetails.url.split("/").filter(Boolean).pop();
      evoChain.push({
        name: evoDetails.name,
        id: parseInt(pokemonId),
      });
      currentEvo = currentEvo.evolves_to[0];
    }
    return evoChain;
  };

  const evolutionChain = getEvolutionChain();
  const pokemonImage = isShiny
    ? pokemon.sprites.other["official-artwork"]?.front_shiny ||
      pokemon.sprites.front_shiny
    : pokemon.sprites.other["official-artwork"]?.front_default ||
      pokemon.sprites.front_default;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-10">
      <div className="mb-4 py-2">
        <Link href="/" legacyBehavior>
          <a className="flex items-center text-gray-600 hover:text-gray-900">
            <span>Return to Pokédex</span>
          </a>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <div className="mt-2 flex flex-wrap gap-1">
              {pokemon.types.map((typeInfo) => (
                <span
                  key={typeInfo.type.name}
                  className="inline-block px-3 py-1 rounded-full text-xs text-white font-medium"
                  style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
                >
                  {typeInfo.type.name.charAt(0).toUpperCase() +
                    typeInfo.type.name.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <span className="text-gray-400 font-medium">{formattedId}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="flex flex-col h-full">
            <div
              className="flex justify-center items-center p-8"
              style={{
                background: getTypeGradient(primaryType),
                height: "420px",
              }}
            >
              <img
                src={pokemonImage}
                alt={pokemon.name}
                className="w-4/5 h-auto object-contain max-h-full"
              />
            </div>

            <div className="p-6 bg-gray-50 flex-grow">
              <h3 className="text-lg font-semibold mb-4">Evolutions</h3>
              {evolutionChain.length > 1 ? (
                <div className="flex justify-center items-center gap-2">
                  {evolutionChain.map((evo, index) => (
                    <div key={evo.id} className="flex items-center">
                      <Link href={`/pokemon/${evo.id}`} legacyBehavior>
                        <a className="text-center">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-16 h-16 rounded-full bg-white flex items-center justify-center mb-1 ${
                                evo.id === id ? "ring-2 ring-orange-400" : ""
                              }`}
                            >
                              <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`}
                                alt={evo.name}
                                className="w-12 h-12"
                                width={48}
                                height={48}
                              />
                            </div>
                            <div className="text-xs font-medium">
                              {evo.name.charAt(0).toUpperCase() +
                                evo.name.slice(1)}
                            </div>
                            <div className="mt-1">
                              <span
                                className="text-xs text-white px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: getTypeColor(primaryType),
                                }}
                              >
                                {primaryType.charAt(0).toUpperCase() +
                                  primaryType.slice(1)}
                              </span>
                            </div>
                          </div>
                        </a>
                      </Link>
                      {index < evolutionChain.length - 1 && (
                        <div className="mx-2">
                          <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="text-orange-400"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No evolution data available
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-2">Weaknesses</h3>
              <div className="flex flex-wrap gap-1">
                {getTypeWeaknesses().map((type) => (
                  <span
                    key={type}
                    className="inline-block px-3 py-1 rounded-full text-xs text-white font-medium"
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-semibold mb-2">Story</h3>
              <p className="text-sm text-gray-700">{getFlavorText()}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-semibold mb-2">Versions</h3>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-1 rounded-full text-sm font-medium border ${
                    !isShiny
                      ? "bg-gray-100 border-gray-300"
                      : "bg-white border-gray-300"
                  }`}
                  onClick={() => setIsShiny(false)}
                >
                  Normal
                </button>
                <button
                  className={`px-4 py-1 rounded-full text-sm font-medium border ${
                    isShiny
                      ? "bg-gray-100 border-gray-300"
                      : "bg-white border-gray-300"
                  }`}
                  onClick={() => setIsShiny(true)}
                >
                  Shiny
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xs text-gray-500 mb-1">Height</h3>
                <p className="text-sm font-medium">{heightInMeters} m</p>
              </div>
              <div>
                <h3 className="text-xs text-gray-500 mb-1">Category</h3>
                <p className="text-sm font-medium">{getCategory()}</p>
              </div>
              <div>
                <h3 className="text-xs text-gray-500 mb-1">Weight</h3>
                <p className="text-sm font-medium">{weightInKg} kg</p>
              </div>
              <div>
                <h3 className="text-xs text-gray-500 mb-1">Abilities</h3>
                <p className="text-sm font-medium">{formattedAbility}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Stats</h3>
              <div className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">
                        {formatStatName(stat.stat.name)}
                      </span>
                      <span className="text-sm font-medium">
                        {stat.base_stat}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (stat.base_stat / 150) * 100,
                            100
                          )}%`,
                          backgroundColor: getStatColor(stat.base_stat),
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatStatName(statName) {
  switch (statName) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "Sp. Attack";
    case "special-defense":
      return "Sp. Defense";
    case "speed":
      return "Speed";
    default:
      return statName.charAt(0).toUpperCase() + statName.slice(1);
  }
}
