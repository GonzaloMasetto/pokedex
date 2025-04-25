interface RawType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }

interface Stats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  }
  
  interface PokemonDetalle {
    id: number;
    name: string;
    imageFront: string; // front_default
    imageBack: string;  // back_default
    types: string[];
    stats: Stats;
  }
  
  export default function obtenerPokemonDetalle(id: number): Promise<PokemonDetalle> {
    const pokemonDetalle = new Promise<PokemonDetalle>((resolve, reject) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) // 🔥 "pokemones" → "pokemon"
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener el Pokémon");
          return res.json();
        })
        .then((json) => {
          resolve({
            id,
            name: json.name,
            imageFront: json.sprites.front_default,
            imageBack: json.sprites.back_default,
            types: json.types.map((t: RawType) => t.type.name),
            stats: {
              hp: json.stats[0].base_stat,
              attack: json.stats[1].base_stat,
              defense: json.stats[2].base_stat,
              specialAttack: json.stats[3].base_stat,
              specialDefense: json.stats[4].base_stat,
              speed: json.stats[5].base_stat,
            },
          });
        })
        .catch((error) => reject(error));
    });
  
    return pokemonDetalle;
  }
  