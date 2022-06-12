import React, {useEffect, useState} from 'react'
import { Detail } from '../App';
import "./pokemon.css"
interface Props{
    viewDetail: Detail;
    setViewDetail: React.Dispatch<React.SetStateAction<Detail>>
    abilities: {
        name: string;
        ability: string
    }[] | undefined ;
    name: string;
    id: number;
    image: string
}

export const PokemonList: React.FC<Props> = (props) => {
    const {name, id, image, abilities, viewDetail, setViewDetail } = props
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
      setIsSelected(id === viewDetail?.id)
  }, [viewDetail])

  const closeDetail = () => {
      setViewDetail({
          id: 0,
          isOpen: false
      })
  }
  return (
    <div>
        {isSelected ? (
            <section className='pokemon-list-detailed'>
                <div className="detail-container">
                    <p className="detail-close" onClick={closeDetail}>
                        X
                    </p>
                    <div className="detail-info">
                        <img src={image} alt="pokemon" className='detail-img' />
                        <p className="detail-name">{name}</p>
                    </div>
                    <div className="detail-skill">
                        <p className="detail-ability">Abilities:</p>
                        {abilities?.map((ab: any) => {
                    return (
                        <div>{ab.ability.name} </div>
                    )
                })}
                    </div>
                </div>
            </section>) :(
        
        <section className="pokemon-list-container">
            <p className='pokemon-name'> {name} </p>
            <img src={image} alt="pokemon" />
            
        </section>)}
   
   </div>
  )
}
