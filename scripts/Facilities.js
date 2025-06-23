import { setFacility } from "./TransientState.js";

const handleFacilitySelection = (steve) => {
  if (steve.target.id === "facility") {
    setFacility(steve.target.value);
  }
}
document.addEventListener("change", handleFacilitySelection);

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