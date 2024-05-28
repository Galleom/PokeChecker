import React from 'react';

export default function GenerationCheckboxList({generationSelectionList, groupId, setGenList}){
    return(
        <div id={groupId} className="btn-toolbar buttons-container p-2 mx-auto rounded-3 m-2 justify-content-evenly" role="group" aria-label="Basic checkbox toggle button group">
        {
        generationSelectionList.map((gen, index) => { 
            return (
            <React.Fragment key={"Gen " + (index+1)} >
                <input type="checkbox" className="btn-check" 
                    id={"Gen " + (index+1)} 
                    onChange={() => {
                        generationSelectionList[index] = !generationSelectionList[index];
                        setGenList(generationSelectionList);
                    }} 
                    checked={generationSelectionList[index]}
                />
                <label className="btn btn-outline-light border-0 m-1 align-content-center" htmlFor={"Gen " + (index+1)}>
                    {"Gen " + (index+1)}
                </label>
            </React.Fragment>
        )})
        }
        </div>
    )
}