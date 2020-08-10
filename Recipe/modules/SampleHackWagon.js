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

exports.calculateCostPerUnit = calculateCostPerUnit;
exports.calculateMeta = calculateMeta;
exports.calculateCostPerUnitHelper = calculateCostPerUnitHelper;