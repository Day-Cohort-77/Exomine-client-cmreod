//import { setColony } from "./TransientState.js";

// const handleColonySelection = (changeEvent) => {
//   if (changeEvent.target.id === "colony") {
//     setColony(changeEvent.target.value);
//   }
// };

// document.addEventListener("change", handleColonySelection);

export const ColonyOptions = async () => {
  const response = await fetch("http://localhost:8088/colonies");
  const colonies = await response.json();

  const colonyHTML = `
        <select id="colony">
            <option value="0">Choose a Colony</option>
            ${colonies
              .map((colony) => {
                return `<option value="${colony.id}">${colony.name} </option>`;
              })
              .join("")}
            
        </select>
        `;
  return colonyHTML;
};
