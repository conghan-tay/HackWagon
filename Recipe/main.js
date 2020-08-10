const HW = require('./modules/SampleHackWagon')

const chocolate = {
    id: '2',
    name: 'Water',
    weight: 1000,
    cost: 0,
  }

let cost = HW.calculateCostPerUnit(chocolate);
console.log("Cost " + cost);
let ingredientMeta = HW.calculateMeta(chocolate);
for ( var prop in ingredientMeta ) {
    console.log(prop + " " + ingredientMeta[prop]);
}
