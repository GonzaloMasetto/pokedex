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

export function PokemonCompleto({
  pokemon,
  cerrarDetalle,
}: {
  pokemon: PokemonDetalle;
  cerrarDetalle: () => void;
}) {
  return (
    <div className="detalle">
      <button onClick={cerrarDetalle}>X</button>
      <div className="card-image-detalle">
        <img src={pokemon.imageFront} alt={pokemon.name} />
        <img src={pokemon.imageBack} alt={pokemon.name} />
      </div>
      <div className="pokemon-info">
        <div className="basic">
          <h4>{pokemon.name}</h4>
          
          <div>
          <p className="card-name" >
            {pokemon.types.map((t: string) => (            
               t              
            ))}
            </p>
          </div>
          <div>
            <p className="id-detalle">#{pokemon.id}</p>
          </div>
          
        </div>

        <div className="stats">
          <p>
            hp: <span>{pokemon.stats.hp}</span>
          </p>
          <p>
            attack: <span>{pokemon.stats.attack}</span>
          </p>
          <p>
            defense: <span>{pokemon.stats.defense}</span>
          </p>
          <p>
            specialAttack: <span>{pokemon.stats.specialAttack}</span>
          </p>
          <p>
            specialDefense: <span>{pokemon.stats.specialDefense}</span>
          </p>
          <p>
            speed: <span>{pokemon.stats.speed}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
