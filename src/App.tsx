// import { useEffect, useState } from "react";
import { useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { usePokemones } from "./hooks/usePokemones";
import { PokemonCompleto } from "./components/PokemonCompleto";
import obtenerPokemonDetalle from "./services/pokemonDetalle";

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
  imageFront: string; //front_default
  imageBack: string; //back_default
  types: string[];
  stats: Stats;
}

function App() {
  const pokemones = usePokemones();
  const [abrirDetalle, setAbrirDetalle] = useState<boolean>(false)
  const [pokemonDetalle, setPokemonDetalle] = useState<PokemonDetalle>()

  
  console.log("pokemones Completos", pokemones);
  const abrirPokemonCompleto = async (id: number) => {
    setAbrirDetalle(true);
    //Llamamos al servicio para traer info completa de pokemon
    const pokemonDetalle = await obtenerPokemonDetalle(id)
    console.log("este pokemon detalle: ", pokemonDetalle)
    setPokemonDetalle(pokemonDetalle)
  }

  const cerrarDetalle = () =>{
    setAbrirDetalle(false);
  }

  return (
    <>
      <section>
        <h2 className="title">Pokedex</h2>
        <div className="grid">
          {pokemones.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              url={pokemon.url}
              image={pokemon.image}
              click={()=>{abrirPokemonCompleto(pokemon.id)}}
            />
          ))}


        </div>
      </section>
      {abrirDetalle &&  pokemonDetalle && <PokemonCompleto pokemon={pokemonDetalle} cerrarDetalle={cerrarDetalle}/>}
      
    </>
  );
}

export default App;
