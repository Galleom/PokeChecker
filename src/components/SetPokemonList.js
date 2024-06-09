import { PokeColumns } from './PokeColumns'
import { FirstGenIds } from './FirstGenIds';
import pokedata from '../assets/pokedata.json' assert {type: 'json'}

//"Form","Pokemon","DexId","Ru","Sa","E","FR","LG","D","P","Pl","HG","SS","B","W","B2","W2","X","Y","OR","AS","Su","Mo","US","UM","Sw","Sh"

export default function SetPokemonList( gameSelectionList, genenerationList, setPokeItems){
    setPokeItems(GetPokemonList(gameSelectionList, genenerationList));
}

function GetPokemonList(gameSelectionList, genenerationList ){
    const smallGameChecklist = []
    var pokelist = []
    var maxGen = 0
    var selectedGenNum = 0
    // find how many generations are selected
    for (var i = 0; i < genenerationList.length; i++){
        if(genenerationList[i]){
            selectedGenNum++
        }
    }
    // finds which games are selected
    for (var i = 0; i < gameSelectionList.length; i++){
        if(gameSelectionList[i].checked){
            smallGameChecklist.push(i);
            maxGen = Math.max(maxGen, gameSelectionList[i].maxGen+1);
        }
    }
    if ((selectedGenNum == 0)){ 
    // no generations are selected
        if ((smallGameChecklist.length > 0)&&(maxGen > 0)){
            // games selected
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
                GetGenerationList(minId, maxId, pokelist)
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
    var gensChecked = new Set();
    // finds which generations within games are selected
    for (var i = 0; i < gameChecklist.length; i++){
        gensChecked.add(gameSelectionList[gameChecklist[i]].group);
    }
    var totalGensChecked = gensChecked.size;
    var gensAvailable;
    for (var id = minId; id < maxId; id++){
        gensAvailable = new Set();
        for (var j = 0; j < gameChecklist.length; j++){
            // is available in game
            if (pokedata[id][gameSelectionList[gameChecklist[j]].column] != ""){ 
                gensAvailable.add(gameSelectionList[gameChecklist[j]].group);
            }
        }
        // adds to list if is available in all games
        if (gensAvailable.size == totalGensChecked){
            AddPokemon(pokelist, pokedata[id]);
        }
    }
}
    // gets a list of pokemon given a min id and max id, regardess of games
function GetGenerationList(minId, maxId, pokelist){
    for (var i = minId; i <= maxId; i++){
        AddPokemon(pokelist, pokedata[i]);
    }
}

function AddPokemon(pokelist, pokemonData){
    pokelist.push([pokemonData[PokeColumns.dexId], pokemonData[PokeColumns.form], pokemonData[PokeColumns.name]])
}