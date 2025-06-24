import { GovernorOptions } from "./Governors.js";
import { FacilityOptions } from "./Facilities.js";
import { MineralOptions } from "./Minerals.js";
import { ColonyDisplay } from "./Colonies.js";

//IMPORT FUNCTIONS TO MAIN

const container = document.querySelector("#container");

//SEARCH FOR container id in index.html



/*
    calling all functions that generate our HTML based on transientState selections
    dynamically update the DOM using string interpolation


*/

const render = async () => {
    const governorHTML = await GovernorOptions();
    const facilitiesHTML = await FacilityOptions();
    const mineralHTML = await MineralOptions();
    const colonyHTML = await ColonyDisplay();


    const composedHTML = `
        <h1>Solar System Mining Marketplace</h1>

        <article class="choices">
            <section class="choices__governor options">
                <h2>Choose a governor</h2>
                ${governorHTML}
            </section>

            <section class="choices__facilities options">
                <h2>Choose a facility</h2>
                ${facilitiesHTML}
            </section>




            <section class="facility-minerals-options" id="minerals-section">  
                <h2>Facility Minerals</h2>            
                ${mineralHTML}
            </section>


            <section class="colony-list">
                ${colonyHTML}
            </section>
        </article>




        <article class="order">
            {buttonHTML}
        </article>




    `;

    container.innerHTML = composedHTML;
};


//^^updates the container using innerHTML

//add an event listener that listens for "stateChange" which we set up in previous modules. when transientState changes based on
// selections, we trigger render function, to update the DOM

document.addEventListener("stateChange", render)



//INITIAL RENDER UPON LOADING DOM
render();
