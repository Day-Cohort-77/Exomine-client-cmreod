import { getSelectedFacility, setMineral } from "./TransientState.js"
 
//responsible for displaying the current minerals as radio buttons based on the facility drop down
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


const handleMineralSelection = (changeEvent) => {
    if (changeEvent.target.id === "mineral") {
        setMineral(changeEvent.target.value);
    }
}
    
document.addEventListener("change", handleMineralSelection)