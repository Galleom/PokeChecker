import React from 'react';
import { useState } from 'react'
import '../css/GamesCheckboxList.css'
export default function GamesCheckboxList({gameSelection, games, groupId, setPokemonItemList}){
    const [negativeMode, setNegativeMode] = useState(false)
    return(
        <div id={groupId} className="games-container mx-auto m-3" role="group" aria-label="Basic checkbox toggle button group">
            <div className='title-container'>
                <button type='button' className='btn btn-outline-light border-0 btn-game-title pb-0'
                    onClick={() => {
                        var allSelected = games.every(gameId => gameSelection[gameId].checked);
                        if (allSelected){
                            games.forEach(gameId => {
                                gameSelection[gameId].checked = false;
                            });
                        } else {
                            games.forEach(gameId => {
                                gameSelection[gameId].checked = true;
                            });
                        }
                        setPokemonItemList(gameSelection);
                    }}>
                    <h5><b>{groupId}</b></h5>
                </button>
                <button type="button" className={"btn btn-outline-light border-0 rounded-circle btn-circle btn-add-remove ".concat(
                    negativeMode ? "btn-color-remove" : "btn-color-add"
                )} onClick={() => {
                    var n = !negativeMode;
                    setNegativeMode(n);
                    games.forEach((gameId) => {
                        gameSelection[gameId].negative = n;
                    })
                    setPokemonItemList(gameSelection);
                }}>
                    <div className={ negativeMode ? 'btn-circle-text-remove align-center' : 'btn-circle-text-add align-center'}>
                        {negativeMode ? "-" : "+"}
                    </div>
                </button>
            </div>
            <div className={"btn-toolbar justify-content-evenly rounded-3 px-2 pb-1 pt-3 ".concat(
                    negativeMode ? "game-names-red" : "game-names")}>
                {
                games.map((gameId) => { 
                    return (
                    <React.Fragment key={gameId}>
                        <input type="checkbox" className="btn-check" 
                        data-bs-toggle="tooltip" 
                            title={gameSelection[gameId].label} 
                            id={gameSelection[gameId].label} 
                            checked={gameSelection[gameId].checked} 
                            onChange={() => { 
                                // update state of pokemon list
                                gameSelection[gameId].checked = !gameSelection[gameId].checked;
                                setPokemonItemList(gameSelection);
                            }}
                        ></input>
                        <label className="btn btn-outline-light border-0 m-1" htmlFor={gameSelection[gameId].label}>
                            {gameSelection[gameId].label}
                        </label>
                    </React.Fragment>
                )})
                }
            </div>
        </div>
    )
}