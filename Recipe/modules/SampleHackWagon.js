/**
 * `ingredients` refers to the database of ingredients that are being stored 
 * @param id unique id of an ingredient
 * @param name describes the name of the ingredient
 * @param weight will always be stored in grams
 * @param cost total cost in $, per unit of the item (1 unit of chocolate 55% costs $10, but it would weigh 1000g)
 */

const ingredients = [
  {
    id: '1',
    name: 'Chocolate 55%',
    weight: 1000,
    cost: 10,
  },
  {
    id: '2',
    name: 'Water',
    weight: 1000,
    cost: 0,
  },
  {
    id: '3',
    name: 'Sugar',
    weight: 1500,
    cost: 10,
  },
  {
    id: '4',
    name: 'Egg',
    weight: 50,
    cost: 10,
  }
];

/**
 * `chocolate` refers to a sample ingredient that could be inserted into the 'DB' above
 */

const chocolate = {
  id: 'choc',
  name: 'Chocolate',
  weight: 1300,
  cost: 14,
}

/**
 * `chocolatePaste` refers to an ingredient that was created by other raw ingredients (defined in the DB)
 * it takes on a structure where it would have a `null` cost, because you are unable to determine the cost of a composite ingredient except by calculating its constituents
 * `recipe` refers to the fact that this such ingredient has a recipe, and such is a "composite ingredient", not a "raw ingredient"
 * `madeWith` refers to the ingredients with which constitutes this recipe, and the respective amounts utillised in the recipe
 */
const chocolatePaste = {
  id: 'choc-paste',
  name: 'Chocolate Paste',
  weight: 1300,
  cost: null, // 14
  recipe: {
    id: '1',
    // total cost of ingredients = 10 + 0 + 4 = 14
    // Cost for 1000g(1kg) = 14/1300 * 1000 = 10.76
    madeWith: [
      { // 10 dollars
        id: '1',
        pos: 0,
        amt: 1000,
        qty: 1,
        ingredient: ingredients[0]
      },
      { // 0 dollars
        id: '2',
        pos: 1,
        amt: 1000,
        qty: 1,
        ingredient: ingredients[1]
      },
      { // 1500g = $10
        // 600g = 10/1500 * 600 = $4
        id: '2',
        pos: 2,
        amt: 600,
        qty: 1,
        ingredient: ingredients[2]
      }
    ]
  }
}

/**
 * `chocolatePaste` refers to an ingredient that was created by other raw ingredients (defined in the DB)
 * however, this ingredient ALSO uses chocolatePaste defined above, which is NOT a raw ingredient
 */
const chocolateBatter = {
    // Total Cost := 21.54 + 0 + 3.33 + 2 = 26.87
    // Cost for 1000g(1kg) = 26.87/1300 * 1000 = 20.669
  id: 'choc-batter',
  name: 'Chocolate Batter',
  weight: 1300,
  cost: null,
  recipe: {
    id: '2',
    madeWith: [
      {
          // 1300g = $14
          // 2000g = 14/1300 * 2000 = 21.54
        id: '1',
        pos: 0,
        amt: 2000,
        qty: 1,
        ingredient: chocolatePaste 
      },
      {
          // water is free = $0
        id: '2',
        pos: 1,
        amt: 1000,
        qty: 1,
        ingredient: ingredients[1]
      },
      { // Sugar
        // 1500g = 10
        // 500g = 10/3 =3.33
        id: '3',
        pos: 2,
        amt: 500,
        qty: 1,
        ingredient: ingredients[2]
      },
      {
          // Egg
          // 50g = $10
          // 10g = $2
        id: '4',
        pos: 3,
        amt: 10,
        qty: 1,
        ingredient: ingredients[3]
      },
    ]
  }
}

const chocolateCake = {
  id: 'choc-batter',
  name: 'Chocolate Batter',
  weight: 1300,
  cost: null, // 15.07  + 34.10 = 49.17 for 1300g ChocolateCake
              // Cost Per 1000g, 49.17/1300 * 1000g = 37.823

  recipe: {
    id: '2',
    madeWith: [
      {
        // 14/1300 * (700 * 2) = 15.07
        id: '1',
        pos: 0,
        amt: 700,
        qty: 2,
        ingredient: chocolatePaste 
      },
      {
        // 26.87/1300 * 1650 = 34.10
        id: '2',
        pos: 0,
        amt: 1650,
        qty: 1,
        ingredient: chocolateBatter
      },
    ]
  }
}

function calculateCostPerUnitHelper(ingredient, amount) {
  let cost = 0;

  if (ingredient.hasOwnProperty("recipe") == false) {
    let costPerGram = ingredient.cost / ingredient.weight;
    cost += amount * costPerGram;
    return cost;
  }

  ingredient.recipe.madeWith.forEach(item => {
    let itemAmt = item.amt * item.qty;
    cost += calculateCostPerUnitHelper(item.ingredient, itemAmt);
  });
  
  return cost / ingredient.weight * amount
}

function calculateCostPerUnit(ingredient) {

  // Cost To Make
  // return calculateCostPerUnitHelper(ingredient, ingredient.weight);

  // Cost Per 1kg
  return calculateCostPerUnitHelper(ingredient, 1000);
}

function calculateMeta(ingredient) {
  return {
    cost : calculateCostPerUnitHelper(ingredient, ingredient.weight),
    weight : ingredient.weight,
    costPerUnit : calculateCostPerUnitHelper(ingredient, 1000)
  };
}

function sum(a, b) {
  return a + b;
}

exports.sum = sum;
exports.calculateCostPerUnit = calculateCostPerUnit;
exports.calculateMeta = calculateMeta;
exports.chocolatePaste = chocolatePaste;
exports.chocolateBatter = chocolateBatter;
exports.chocolateCake = chocolateCake;
exports.calculateCostPerUnitHelper = calculateCostPerUnitHelper;