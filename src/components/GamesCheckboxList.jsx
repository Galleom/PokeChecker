import React from 'react';
import { useState } from 'react'
import '../css/GamesCheckboxList.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

export default function GamesCheckboxList({gameSelection, games, groupId, setPokemonItemList}){
    const [negativeMode, setNegativeMode] = useState(false)
    const [isOn, setOn] = useState(false)
    return(
        <div id={groupId} className="games-container mx-auto m-3" role="group" aria-label="Basic checkbox toggle button group">
            <div className={"rounded-3 ".concat(isOn ? "px-2 pb-1 " : "px-2 mx-1 ").concat(
                    !isOn ? "game-names-off" : (!negativeMode  ? "game-names-blue" : "game-names-red"))}>
                <div className={'title-container-'.concat(isOn ? "on" : "off")}>
                    <button type='button' className={'btn btn-outline-light border-0 pb-0 btn-game-title-'.concat(isOn ? "on" : "off")}
                        onClick={() => {
                            setOn(!isOn);
                            if (isOn){
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
                    { isOn &&
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
                    }
                </div>

                <div className={"btn-toolbar pt-3 btn-toolbar-".concat(isOn ? "on" : "off") }>
                    {
                    games.map((gameId) => { 
                        return (
                        <React.Fragment key={gameId}>
                            <input type="checkbox" className="btn-check"
                            data-bs-toggle="tooltip" 
                                title={gameSelection[gameId].label} 
                                id={gameId} 
                                checked={gameSelection[gameId].checked} 
                                onChange={() => { 
                                    // update state of pokemon list
                                    gameSelection[gameId].checked = !gameSelection[gameId].checked;
                                    setPokemonItemList(gameSelection);
                                }}
                            ></input>
                            <label className={"btn btn-outline-light border-0 m-1 btn-element"}
                                htmlFor={gameId}>
                                {gameSelection[gameId].label}
                            </label>
                        </React.Fragment>
                    )})
                    }
                </div>
            </div>
        </div>
    )
}