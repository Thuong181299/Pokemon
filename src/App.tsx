import React, { useState, useEffect} from 'react';
import axios from "axios"
import './App.css';
import { PokemonCollectiom } from './components/PokemonCollectiom';
import { Pokemon } from './interface';

interface Pokemons {
  name: string;
  url: string
}

export interface Detail {
  id: number;
  isOpen: boolean
}

const App: React.FC = () =>  {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpen: false
  })
  useEffect(() => {
    const getPokemon = async() => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=30&offset=30")
      setNextUrl(res.data.next)
      res.data.results.forEach(async(pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons((p) => [...p, poke.data])
      setLoading(false)
      })
    }
  getPokemon()


    
  }, [])
  
 const nextPage = async () => {
   setLoading(true)
   let res = await axios.get(nextUrl);
   setNextUrl(res.data.next)
   res.data.results.forEach(async (pokemon: Pokemons) => {
     const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
     setPokemons((p) => [...p, poke.data])
     setLoading(false)
    })
 }

  return (
    <div className="App">
      <div className="container">
        <header className='pokemon-header'>Hello-Adele</header>
        <PokemonCollectiom pokemons = {pokemons} viewDetail={viewDetail} setViewDetail={setViewDetail} />
        <div className="btn">
          <button onClick={nextPage}> {loading ? "Loading..." : "Load Mone"} </button>
        </div>
      </div>
    </div>
  );
}

export default App;
