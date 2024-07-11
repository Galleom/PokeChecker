import { useState, useEffect, useRef } from 'react'
import PokeCounter from './components/PokeCounter'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css'
import ListGroup from './components/ListGroup'
import SetPokemonList from './components/SetPokemonList'
import PokemonList from './components/PokemonList'
import {baseGameSelectionList} from './components/GameSelectionList'
import GamesCheckboxList from './components/GamesCheckboxList'
import GenerationCheckboxList from './components/GenerationCheckboxList'
import './assets/pokesprite.scss'
import './css/App.css'
import PokeBackground from './components/PokeBackground'

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
          <i id="safari-ball" className={"pkicon pkicon-ball-safari"} data-bs-toggle="tooltip" title="Source"/>
        </a>
        <div id = "pokemon-list container m-2">
          <PokemonList items={pokeItems}/>
        </div>
        <div className='m-2'>
          <PokeCounter
            items={pokeItems}/>
        </div>
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
            games={[35, 36, 37, 38]}
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
            games={[22, 23, 24, 25]}
            groupId={"Gen 8"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[31]}
            groupId={"LGPE"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[32]}
            groupId={"BDSP"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[26]}
            groupId={"Legceus"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[27, 28, 29, 30]}
            groupId={"Gen 9"}
            setPokemonItemList={setPokemonItemList}/> 
          <GamesCheckboxList
            gameSelection={gameSelectionList}
            games={[33, 34]}
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
