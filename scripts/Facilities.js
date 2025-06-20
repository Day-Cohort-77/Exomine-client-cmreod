import { setFacility } from "./TransientState.js";

const handleFacilitySelection = (changeEvent) => {
  if (changeEvent.target.id === "facility") {
    setFacility(changeEvent.target.value);
  }
}
document.addEventListener("stateChange", handleFacilitySelection);

export const FacilityOptions = async () => {
    const response = await fetch("http://localhost:8088/facilities");
    const facilities = await response.json();

    const facilityHTML = `
        <select id="facility">
            <option value="0">Choose a Facility</option>
            ${facilities
              .map((facility) => {
                return `<option value="${facility.id}">${facility.name}</option>`;
              })
              .join("")}

        </select>
    `;
    return facilityHTML;
}