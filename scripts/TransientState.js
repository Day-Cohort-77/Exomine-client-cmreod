//initializing transientState values, expecting integers
const transientState = {
    selectedGovernor: 0,
    selectedFacility: 0,
    selectedMineral: 0,
    selectedColony: 0
};

//creating setter functions from line 10-27, parseInt to make each value an integer rather than a string
//dispatching a custom event to signal a "stateChange" so that main.js will render the HTML everytime
//the state is changed
export const setGovernor = (GovernorId) => {
    transientState.selectedGovernor = parseInt(GovernorId)
    document.dispatchEvent(new CustomEvent("stateChange"))
}

export const setFacility = (facilityId) => {
    transientState.selectedFacility = parseInt(facilityId)
    document.dispatchEvent(new CustomEvent("stateChange"))
}
export const setMineral = (MineralId) => {
    transientState.selectedMineral = parseInt(MineralId)
    document.dispatchEvent(new CustomEvent("stateChange"))
}

export const setColony = (colonyId) => {
    transientState.selectedColony = parseInt(colonyId)
    document.dispatchEvent(new CustomEvent("stateChange"))
}


//setting up some getter functions to use in each module to have the responsibility of just getting the current
//transientState selection 
export const getSelectedFacility = () => transientState.selectedFacility;
export const getSelectedMineral = () => transientState.selectedMineral;
// export const getSelectedColony = () => transientState.selectedColony;
export const getSelectedGovernor = () => transientState.selectedGovernor;




//This would have been our submission button, which would add 1 ton of purchased material at a time to colonyMinerals
//if there is already an existing supply of said mineral, it would trigger a PUT method
//if there is none of said mineral yet, it would trigger a POST method
//dispatching a custom event for stateChange
export const addMineralToColony = async () => {
    const response = await fetch(`http://localhost:8088/colonyMinerals?colonyId=${transientState.selectedColony}&mineralId=${transientState.selectedMineral}`);
    const records = await response.json();

    if (records.length > 0) {

        await fetch(`http://localhost:8088/colonyMinerals/${records[0].id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                quantity: records[0].quantity + 1,
                id: records[0].id,
                colonyId: records[0].id,
                mineralId: records[0].id
            })
        });
    } else {
        await fetch("http://localhost:8088/colonyMinerals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                colonyId: transientState.selectedColony,
                mineralId: transientState.selectedMineral,
                quantity: 1
            })
        });
    }
    document.dispatchEvent(new CustomEvent("stateChange"));
};