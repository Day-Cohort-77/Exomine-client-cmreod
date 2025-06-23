import { GovernorOptions } from "./Governors.js";
import { FacilityOptions } from "./Facilities.js";
import { MineralOptions } from "./Minerals.js";
// import { TechOptions } from "./techOptions.js";
// import { WheelOptions } from "./wheelOptions.js";
// import { OrderButton } from "./OrderButton.js";

const container = document.querySelector("#container");

const render = async () => {
  const governorHTML = await GovernorOptions();
  const facilitiesHTML = await FacilityOptions();
  const mineralHTML = await MineralOptions();
  
  // const technologyHTML = await TechOptions();
  // const wheelHTML = await WheelOptions();
  // const buttonHTML = await OrderButton();

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


            <section class="choices__wheels options">
                <h2>Wheel Options</h2>
                {wheelHTML}
            </section>
        </article>




        <article class="order">
            {buttonHTML}
        </article>




        <article class="customOrders">
            <h2>Custom Car Orders</h2>
        </article>
    `;

  container.innerHTML = composedHTML;
};

document.addEventListener("stateChange", render)

render();
