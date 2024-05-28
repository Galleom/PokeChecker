import '../assets/pokesprite.scss'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import { useEffect } from 'react'
import '../css/PokemonList.css'

export default function PokemonList({ items }){
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    useEffect(()=>{
        items.map((pokemon, index) => {
            return new bootstrap.Tooltip(document.getElementById(pokemon[2] + "-" + pokemon[1]))
        })
    })
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    return(
        <div className='pre-scrollable w-100 rounded container overflow-auto shadow border border-white border-4'>
            {items.map((pokemon, index) => {
                return (
                <i key={index} 
                    id={ pokemon[2] + "-" + pokemon[1]}
                    alt={pokemon[2]}
                    title={ pokemon[1] != "" ? pokemon[2] + "(" + capitalizeFirstLetter(pokemon[1]) + ")" : pokemon[2]}
                    data-toggle="tooltip"
                    className={
                    pokemon[1] == "" ? 
                        "pkicon pkicon-" + String(zeroPad(pokemon[0], 4)) + " " // no form
                        :
                        "pkicon pkicon-" + zeroPad(pokemon[0], 4) + " form-" + pokemon[1] + " " // with form
                    }
            />
            )}
        )}
            
        </div>
    )
}