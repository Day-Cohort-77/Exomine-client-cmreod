import { setGovernor } from "./TransientState.js";

const handleGovernorSelection = (changeEvent) => {
  if (changeEvent.target.id === "governor") {
    setGovernor(changeEvent.target.value);
  }
};

document.addEventListener("stateChange", handleGovernorSelection);

export const GovernorOptions = async () => {
  const response = await fetch("http://localhost:8088/governors");
  const governors = await response.json();

  const governorHTML = `
        <select id="governor">
            <option value="0">Choose a Governor</option>
            ${governors
      .map((governor) => {
        return `<option value="${governor.id}">${governor.name} </option>`;
      })
      .join("")}
            
        </select>
        `;
  return governorHTML;
};
