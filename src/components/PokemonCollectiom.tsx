import React from 'react'
import { Pokemon, PokemonDetail } from '../interface'
import { PokemonList } from './PokemonList'
import "./pokemon.css"
import { Detail } from '../App'
interface Props {
    pokemons: PokemonDetail[]
    viewDetail: Detail
    setViewDetail: React.Dispatch<React.SetStateAction<Detail>>
  }
  


export const PokemonCollectiom: React.FC<Props> = (props) => {
    const {pokemons, viewDetail, setViewDetail} = props
    const selectPokemon = (id: number) => {
        if (!viewDetail.isOpen) {

            setViewDetail({
                id: id,
                isOpen: true
            })
        }
    }
  return (
    <div>
        <section className={viewDetail.isOpen? "collection-container-active" : "collection-container"}>
            {viewDetail.isOpen ? (
                <div className="overlay">

                </div>
            ) : (
                <div className=''></div>
            )}
            {pokemons.map((pokemon) => {
                return (
                    <div onClick={() => selectPokemon(pokemon.id) } >
                        <PokemonList 
                          viewDetail = {viewDetail}
                          setViewDetail={setViewDetail}
                           key={pokemon.id} 
                           name={pokemon.name} 
                           id={pokemon.id}
                           abilities = {pokemon.abilities}
                           image={pokemon.sprites.front_default}  />
                    </div>
                )
            })}
        </section>
    </div>
  )
}
