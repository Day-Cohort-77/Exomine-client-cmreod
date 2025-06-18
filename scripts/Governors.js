export const GovernorOptions = async () => {
  const response = await fetch("http://localhost:8088/");
  const governors = await response.json();
  
  const governorHTML = `
        <select id="wheel">
            <option value="0">Choose a Governor</option>
            ${governors
              .map((governor) => {
                return `<option value="${governor.id}">${governor.} </option>`;
              })
              .join("")}
            
        </select>
        `;
  return wheelHTML;
};
