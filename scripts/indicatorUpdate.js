import { cityObj } from "./sortData.js";
import { litterData } from "../data/category.js";

// litter by type
export function percentageLvl(cityName) {
  const percentageLvl = document.querySelector(".js-percentage");
  percentageLvl.innerHTML = `${litterData[cityName].plasticPerc}`;
}

// calculate total litter counts for each city
export function totalCount(cityName) {
  let total = 0;

  cityObj[cityName].forEach((feature) => {
    total += feature.properties.count;
  });

  const totalC = document.querySelector(".js-total-count");
  totalC.innerHTML = `${total}`;
}

// key factors
// calculate average numbers for each factor
function calculateAverage(data, propertyName) {
  let totalCount = 0;
  const totalFeatures = data.length;

  data.forEach((feature) => {
    totalCount += feature.properties[propertyName];
  });

  return totalFeatures > 0 ? totalCount / totalFeatures : 0;
}

// Example usage:
export function updateIndicator(data) {
  const avgRisk = calculateAverage(cityObj[data], "Risk_Category").toFixed(2);
  const avgRetail = Math.floor(calculateAverage(cityObj[data], "retail_nn"));
  const avgResidential = Math.floor(
    calculateAverage(cityObj[data], "residential_nn")
  );
  const avgWaterDis = Math.floor(
    calculateAverage(cityObj[data], "water_sig_dis")
  );
  const avgPop = calculateAverage(cityObj[data], "sum_pop");

  // update risklevel
  const riskElm = document.querySelector(".js-number");
  riskElm.innerHTML = `${avgRisk}`;

  // Update the indicators in the html
  const countElm = document.querySelector(".js-pop");
  countElm.innerHTML = `
        <span class="number">${Math.floor(avgPop)}</span>
        <span class="number-stat"></span>
        <p>Avg Population</p>
    `;

  const waterElm = document.querySelector(".js-water");
  waterElm.innerHTML = `
        <div class="number">${avgWaterDis}</div>
        <p>Distance to water</p>
    `;

  const wasteElm = document.querySelector(".js-waste");
  wasteElm.innerHTML = `
        <div class="number">${avgRetail}</div>
        <p>Retail zoning score</p>
    `;

  const restaurantElm = document.querySelector(".js-restaraunt");
  restaurantElm.innerHTML = `
        <div class="number">${avgResidential}</div>
        <p>Restaurant zoning score</p>
    `;
}
