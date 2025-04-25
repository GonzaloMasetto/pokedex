interface Pokemon {
    id: number;
    name: string;
    image: string;
    url: string;
    click: (name: string) => void;
  }
  
  export function Card({ id, name, image, click }: Pokemon) {
    return (
      <div className="card" onClick={() => click(name)}>
        <div className="card-image">
          <img src={image} alt={name} />
        </div>
        <div className="card-content">
          <h2 className="card-name">{name}</h2>
          <h1 className="card-id">#{id}</h1>
        </div>
      </div>
      
    );
  }
  
  
  
  