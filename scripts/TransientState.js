const transientState = {
    selectedGovernor: 0,
    selectedFacility: 0,
    selectedMineral: 0,
    selectedColony: 0
};


export const setGovernor = (GovernorId) => {
    transientState.selectedGovernor = GovernorId
    document.dispatchEvent(new CustomEvent("stateChange"))
}

export const setFacility = (facilityId) => {
    transientState.selectedFacility = facilityId
    document.dispatchEvent(new CustomEvent("stateChange"))
}
export const setMineral = (MineralId) => {
    transientState.selectedMineral = MineralId
    document.dispatchEvent(new CustomEvent("stateChange"))
}

export const setColony = (colonyId) => {
    transientState.selectedColony = colonyId
    document.dispatchEvent(new CustomEvent("stateChange"))
}

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