import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import getTypeColor from "@/app/utils/getTypeColor";
import getTypeGradient from "@/app/utils/getTypeGradient";
import Image from "next/image";
export default function PokemonCard({ id }) {
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

  if (isLoading) {
    return (
      <div className="relative w-full max-w-xs min-h-[500px] rounded-3xl bg-white shadow-md overflow-hidden p-3 flex flex-col mx-auto">
        <div className="flex justify-center items-center h-[300px] text-gray-600">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full max-w-xs min-h-[500px] rounded-3xl bg-white shadow-md overflow-hidden p-3 flex flex-col mx-auto">
        <div className="flex justify-center items-center h-[300px] text-red-500">
          Error: {error.message}
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="relative w-full max-w-xs min-h-[500px] rounded-3xl bg-white shadow-md overflow-hidden p-3 flex flex-col mx-auto">
        <div className="flex justify-center items-center h-[300px] text-red-500">
          Pokémon not found
        </div>
      </div>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  const primaryAbility = pokemon.abilities[0]?.ability.name || "";
  const formattedAbility =
    primaryAbility.charAt(0).toUpperCase() +
    primaryAbility.slice(1).replace("-", " ");

  return (
    <Link href={`/pokemon/${id}`} legacyBehavior>
      <a className="relative w-full max-w-xs min-h-[500px] rounded-3xl bg-white shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden p-3 flex flex-col mx-auto">
        <div
          className="relative w-full h-[180px] flex justify-center items-center mb-3 rounded-2xl overflow-hidden"
          style={{ background: getTypeGradient(primaryType) }}
        >
          <Image
            src={
              pokemon.sprites.other["official-artwork"]?.front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            fill
            objectFit="contain"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 flex-1">
          <h2 className="text-2xl font-bold m-0 mb-1">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <div className="text-base text-gray-600 mb-3">{formattedId}</div>

          <div className="flex gap-2 mb-4">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className="px-3 py-1 rounded-full text-xs text-white font-medium"
                style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
              >
                {typeInfo.type.name.charAt(0).toUpperCase() +
                  typeInfo.type.name.slice(1)}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 border-b border-gray-100 pb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">WEIGHT</div>
              <div className="text-base font-medium">{weightInKg} kg</div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">HEIGHT</div>
              <div className="text-base font-medium">{heightInMeters} m</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">CATEGORY</div>
              <div className="text-base font-medium">
                {pokemon.genus ||
                  primaryType.charAt(0).toUpperCase() + primaryType.slice(1)}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">ABILITY</div>
              <div className="text-base font-medium">{formattedAbility}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
