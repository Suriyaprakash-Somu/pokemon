"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import getTypeGradient from "./utils/getTypeGradient";

export default function NotFound() {
  const [randomPokemon, setRandomPokemon] = useState(null);

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 151) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((response) => response.json())
      .then((data) => {
        setRandomPokemon(data);
      })
      .catch((error) => {
        console.error("Error fetching random Pokémon:", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden p-8 text-center">
        {randomPokemon ? (
          <div className="mb-6">
            <div
              className="w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-4 border-8 border-white"
              style={{
                background: getTypeGradient(
                  randomPokemon.types[0]?.type.name || "normal"
                ),
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={
                  randomPokemon.sprites.other["official-artwork"]
                    ?.front_default || randomPokemon.sprites.front_default
                }
                alt={randomPokemon.name}
                className="w-28 h-28 object-contain"
              />
            </div>
            <p className="text-lg text-gray-600">
              {randomPokemon.name.charAt(0).toUpperCase() +
                randomPokemon.name.slice(1)}{" "}
              is confused!
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <div className="w-40 h-40 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4 animate-pulse">
              <span className="text-gray-400">Loading...</span>
            </div>
          </div>
        )}

        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved to another
          location.
        </p>

        <Link href="/" legacyBehavior>
          <a className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors duration-200">
            Return to Pokédex
          </a>
        </Link>
      </div>
    </div>
  );
}
