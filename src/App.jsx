import { useState, useEffect, useRef } from 'react'
import PokeCounter from './components/PokeCounter'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css'
import SetPokemonList from './components/SetPokemonList'
import PokemonList from './components/PokemonList'
import {baseGameSelectionList} from './components/GameSelectionList'
import GamesCheckboxList from './components/GamesCheckboxList'
import GenerationCheckboxList from './components/GenerationCheckboxList'
import './assets/pokesprite.scss'
import './assets/pokeballsprite.scss'
import './css/App.css'
import PokeBackground from './components/PokeBackground'
import Json2Csv from './components/Json2Csv'

function App() {

  const [pokeItems, setPokeItems] = useState([])
  const [genenerationList, setGenerationSelection] = useState(
    [false,false,false,
      false,false,false,
      false,false,false])
    const [gameSelectionList, setGameSelection] = useState(baseGameSelectionList)
    var tooltip = null
  useEffect(()=>{
    if (tooltip == null){
      tooltip = new bootstrap.Tooltip(document.getElementById("safari-ball"))
    }
  })
  return (
    <div className='background' >
      <div className='col-xs-1 text-center w-100 p-2' >
        <h2 className='text-light'>PokeChecker</h2>
        <h5 className='text-light'>Check the availability of your Pokemon over multiple games!</h5>
        <a href="https://github.com/Galleom/PokeChecker">
          <i id="safari-ball" className={"pkicon-ball safari"} data-bs-toggle="tooltip" title="Source"/>
        </a>
        <div id = "pokemon-list container m-2">
          <PokemonList items={pokeItems}/>
        </div>
        <div className='m-2'>
          <PokeCounter
            items={pokeItems}/>
        </div>
        <Json2Csv items={pokeItems} />
        <div className='container m-2 mx-auto d-flex flex-wrap'>
          <GenerationCheckboxList
            generationSelectionList={genenerationList}
            groupId={"gensList"}
            setGenList={setGenList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[0, 1, 2, 3, 4]}
            groupId={"GBA"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[43, 44, 45, 46]}
            groupId={"Game Cube"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[5, 6, 7, 8, 9]}
            groupId={"Gen 4"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[10, 11, 12, 13]}
            groupId={"Gen 5"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[14, 15, 16, 17]}
            groupId={"Gen 6"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[18, 19, 20, 21]}
            groupId={"Gen 7"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[22, 23, 24, 25, 26, 27, 28]}
            groupId={"Gen 8"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[37, 38]}
            groupId={"LGPE"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[39, 40]}
            groupId={"BDSP"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[29]}
            groupId={"Legceus"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[30, 31, 32, 33, 34, 35, 36]}
            groupId={"Gen 9"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[41, 42, 47]}
            groupId={"Others"}
            setPokemonItemList={setPokemonItemList}/> 
          </div>
      </div>
    </div>
  )
  function setPokemonItemList(gameSelectionList){
    setGameSelection(gameSelectionList)
    SetPokemonList(gameSelectionList, genenerationList, setPokeItems);
  }
  function setGenList(genenerationList){
    setGenerationSelection(genenerationList)
    SetPokemonList(gameSelectionList, genenerationList, setPokeItems);
  }
}

export default App
