import { setGovernor } from "./TransientState.js";


/*export and define a function
fetch JSON database array of governors
parse that data into javascript
start rendering HTML by iterating through governers array using .map method
*/
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



/*
  based on the change event that happens, if the change event's target.id is equal to governor
  we run the setGovernor function to update the transientState, which should trigger main.js to 
  render the HTML again
*/
const handleGovernorSelection = (changeEvent) => {
  if (changeEvent.target.id === "governor") {
    setGovernor(changeEvent.target.value);
  }
};

document.addEventListener("change", handleGovernorSelection);