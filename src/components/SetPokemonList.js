import { PokeColumns } from './PokeColumns'
import { FirstGenIds } from './FirstGenIds';
import pokedata from '../assets/pokedata.json' assert {type: 'json'}
const lastGenNum = 10;

//"Form","Pokemon","DexId","Ru","Sa","E","FR","LG","D","P","Pl","HG","SS","B","W","B2","W2","X","Y","OR","AS","Su","Mo","US","UM","Sw","Sh"

export default function SetPokemonList( gameSelectionList, genenerationList, setPokeItems){
    setPokeItems(GetPokemonList(gameSelectionList, genenerationList));
}

function GetPokemonList(gameSelectionList, genenerationList ){
    const smallGameChecklist = []
    const smallGameChecklistRemove = []
    var pokelist = []
    var maxGen = 0
    var selectedGensNum = 0
    // find how many generations are selected
    for (var i = 0; i < genenerationList.length; i++){
        if(genenerationList[i]){
            selectedGensNum++
        }
    }
    // finds which games are selected
    for (var i = 0; i < gameSelectionList.length; i++){
        if(gameSelectionList[i].checked){
            smallGameChecklist.push(i);
            maxGen = Math.max(maxGen, gameSelectionList[i].maxGen+1);
            if(gameSelectionList[i].negative){
                smallGameChecklistRemove.push(i);
            }
        }
    }
    if ((selectedGensNum == 0)){ 
    // no generations are selected
        if ((smallGameChecklist.length > 0)&&(maxGen > 0)){
            // games selected
            if (smallGameChecklist.length - smallGameChecklistRemove.length == 0){
                maxGen = lastGenNum;
            } 
            GetGenerationPokemonList(FirstGenIds[1], FirstGenIds[maxGen], smallGameChecklist, gameSelectionList, pokelist)
        } 
    } else if (smallGameChecklist.length == 0){ 
        // no games selected
        var minId = 0; var maxId = 0;
        // generation selected
        for (var i = 0; i < genenerationList.length; i++){
            if(genenerationList[i]){
                minId = FirstGenIds[i+1]
                maxId = FirstGenIds[(i+2)]-1
                GetGenerationList(minId, maxId, smallGameChecklistRemove, gameSelectionList, pokelist)
            }
        }
    } else {
        // some games and generations were selected
        var minId = 0; var maxId = 0;
        for (var i = 0; i < genenerationList.length; i++){
            if(genenerationList[i]){
                minId = FirstGenIds[i+1]
                maxId = FirstGenIds[(i+2)]
                GetGenerationPokemonList(minId, maxId, smallGameChecklist, gameSelectionList, pokelist)
            }
        }
    }
    return pokelist
}
// gets a list of pokemon given a min id and max id, based on the game checklist
function GetGenerationPokemonList(minId, maxId, gameChecklist, gameSelectionList, pokelist){
    var gameGroups = new Set();
    gameChecklist.forEach(game => {
        if (!gameSelectionList[game].negative){
            gameGroups.add(gameSelectionList[game].group)
        }
    });
    var totalGamesChecked = gameGroups.size;
    var groupsAvailable = new Set();
    var skip = false;
    var gameId = 0;
    for (var id = minId; id < maxId; id++){
        groupsAvailable = new Set();
        skip = false;
        for (var j = 0; j < gameChecklist.length; j++){
            gameId = gameChecklist[j]
            // is available in game
            if (pokedata[id][gameSelectionList[gameId].column] != ""){ 
                if (gameSelectionList[gameId].negative){ // negative game, skip pokemon
                    skip = true;
                    break;
                } else {
                    groupsAvailable.add(gameSelectionList[gameId].group);
                }
            }
        }
        if (skip){
            continue;
        }
        // adds to list if is available in all games
        if (groupsAvailable.size == totalGamesChecked && !skip){
            AddPokemon(pokelist, pokedata[id]);
        }
    }
}
    // gets a list of pokemon given a min id and max id, regardess of games
function GetGenerationList(minId, maxId, gameChecklistRemove, gameSelectionList, pokelist){
    if (gameChecklistRemove.length > 0){
        // has games to remove
        var skip = false;
        for (var i = minId; i <= maxId; i++){
            skip = false;
            for (var j = 0; j < gameChecklistRemove.length; j++){
                // is available in game
                if (pokedata[i][gameSelectionList[gameChecklistRemove[j]].column] != ""){ 
                    if (gameSelectionList[gameChecklistRemove[j]].negative){ // negative game, skip pokemon
                        skip = true;
                        break;
                    }
                }
            }
            if (!skip){
                AddPokemon(pokelist, pokedata[i]);
            }
        }
    } else {
        // only generations
        for (var i = minId; i <= maxId; i++){
            AddPokemon(pokelist, pokedata[i]);
        }
    }
}

function AddPokemon(pokelist, pokemonData){
    pokelist.push([pokemonData[PokeColumns.dexId], pokemonData[PokeColumns.form], pokemonData[PokeColumns.name]])
}