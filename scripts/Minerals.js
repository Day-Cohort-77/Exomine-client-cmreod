import { getSelectedFacility, setMineral } from "./TransientState.js"

/*responsible for displaying the current minerals as radio buttons based on the facility drop down
fetch and parse minerals array from JSON database
call our getSelectedFacility function 
fetch and expand facilityMinerals array based on which facility was selected (facilityId) then parse to JS
define mineralHTML variable and iterate through facilityMinerals array using .map
refer to the minerals array and use .find method to find instances of matching foreign keys (mineralId and mineral.id)
return radio buttons for each available mineral and the current amount and name
.join to continue rendering multiple buttons as a string
*/
export const MineralOptions = async () => {
    const response = await fetch(`http://localhost:8088/minerals`);
    const minerals = await response.json();

    const facilityId = getSelectedFacility();


    const davis = await fetch(`http://localhost:8088/facilityMinerals?facilityId=${facilityId}`);
    const facilityMinerals = await davis.json()

    const mineralHTML = `
    ${facilityMinerals
            .map((facilityMineral) => {
                const foundMineral = minerals.find(mineral => facilityMineral.mineralId === mineral.id)
                return `<input type="radio" name="facilityMineral" id="facilityMineral" value="${facilityMineral.id}">${facilityMineral.current_amount} tons of ${foundMineral.name}</label>`;
            })
            .join("")}`
    return mineralHTML
}

/*
   based on the change event that happens, if the change event's target.id is equal to mineral
  we run the setMineral function to update the transientState, which should trigger main.js to 
  render the HTML again
*/
const handleMineralSelection = (changeEvent) => {
    if (changeEvent.target.id === "mineral") {
        setMineral(changeEvent.target.value);
    }
}

document.addEventListener("change", handleMineralSelection)