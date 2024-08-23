import { useEffect } from 'react'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import './../assets/pokeballsprite.scss'
const separator = ';'
const fileName = "PokeCheckerList"

export default function Json2Csv( { items } ){
    
    const convertToCSV = (objArray) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';

        for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line !== '') line += separator;

            line += array[i][index];
        }
        str += line + '\r\n';
        }
        return str;
    };

    const downloadCSV = () => {
        const csvData = new Blob([convertToCSV(items)], { type: 'text/csv' });
        const csvURL = URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvURL;
        link.download = `${fileName}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const test = () => {
        console.log('Click!!!!');
    }

    var tooltip = null
    useEffect(()=>{
      if (tooltip == null){
        tooltip = new bootstrap.Tooltip(document.getElementById("repeat-ball"))
      }
    })
    return(
        <div>
        <i id="repeat-ball" className={"pkicon-ball repeat"} data-bs-toggle="tooltip" title="Export as .csv"
          onClick={downloadCSV}
        />
        </div>
    )
}