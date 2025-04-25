import { useEffect, useState } from "react";

export function usePokemones() {
 
  
  interface PokemonBase  {
    id: number;
    name: string;
    url: string;
  }

  interface PokemonConImagen extends PokemonBase{
    image: string;
  }

  const [pokemones, setPokemones] = useState<PokemonBase[]>([]);
  const [pokemonesCompletos, setPokemonesCompletos] = useState<PokemonConImagen[]>([]);

  const urlBase: string = "https://pokeapi.co/api/v2/";

  //Busca la imagen
  useEffect(() => {
    const nuevosPokemones: PokemonConImagen[] = [];

    // Sin async/await
    Promise.all(pokemones.map((pokemon)=>{
      return fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => nuevosPokemones.push({
          ...pokemon,
          image: data.sprites.front_default
        }))
    })).then(()=>setPokemonesCompletos(nuevosPokemones.sort((a, b) => a.id - b.id)))

    // Promise.all(
    //   pokemones.map(async (pokemon) => {
    //     const response = await fetch(pokemon.url);
    //     const data = await response.json();
    //     return { ...pokemon, image: data.sprites.front_default };
    //   })
    // ).then((nuevosPokemones) =>
    //   setPokemonesCompletos(nuevosPokemones.sort((a, b) => a.id - b.id))
    // );


    //Opcioon sin promise.all ni async.
    // pokemones.map((pokemon) => {
    //   fetch(pokemon.url)
    //     .then((res) =>  res.json())
    //     .then((json)=>setPokemonesCompletos((prev) => [...prev, {...pokemon,image: json.sprites.front_default} ]))
     
    // })

      
  // )
  }, [pokemones]);

  //Trae los pokemones
  useEffect(() => {
    fetch(`${urlBase}pokemon?limit=21&offset=0`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonesConId = data.results.map((pokemon: PokemonBase) => {
          const id = Number(pokemon.url.split("/").filter(Boolean).pop());
          return {
            ...pokemon,
            id,
          };
        });

        setPokemones(pokemonesConId);
      });
  }, []);

  return pokemonesCompletos;
}
