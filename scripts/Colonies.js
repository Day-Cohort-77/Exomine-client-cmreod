import { getSelectedGovernor } from "./TransientState.js"

//this function takes the governer selection and displays the corresponding colony and currrent mineral amounts
export const ColonyDisplay = async () => {



    // we need to get the selected governor object from the transient state
    const governor = getSelectedGovernor();
    if (governor === 0)
        return `<h2>Colony Minerals</h2>`


    const governors = await fetch(`http://localhost:8088/governors?_expand=colony&id=${governor}`);
    const selectedGovernorArray = await governors.json();



    const answer = await fetch(`http://localhost:8088/colonyMinerals?colonyId=${selectedGovernorArray[0].colonyId}`);
    const colonyMinerals = await answer.json()


    const minerals = await fetch(`http://localhost:8088/minerals`);
    const allMinerals = await minerals.json();




    let colonyHTML = `${selectedGovernorArray[0].colony.name} Minerals:`

    colonyHTML += colonyMinerals.map(cm => {
        const mineral = allMinerals.find(mineral => mineral.id === cm.mineralId)
        return `<div>${cm.quantity} tons of ${mineral.name}</div>`
    }).join("")
    // allGovernors.find(governor => governor.colonyId === colony.id) 

    return colonyHTML

}

//  WE DID NOT FULLY ACHIEVE THIS MODULE, IF PROPERLY ACHIEVED, IT WOULD HAVE UPDATED THE CORRECT COLONY NAME BASED ON GOVERNOR
// SELECTION. IT WOULD HAVE ALSO DISPLAYED THE CURRENT QUANTITY OF MINERALS CONTAINED IN SAID COLONY