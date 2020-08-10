const HW = require('./modules/SampleHackWagon')

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

test('chocolateCake calculateMeta', () => {
    let expectedCost = Math.round(49.18 * 100),
        expectedCostPerUnit = Math.round(37.833 * 100),
        expectedWeight = chocolateCake.weight;

    meta = HW.calculateMeta(chocolateCake);
    expect(Math.round(meta.cost*100)).toBe(expectedCost);
    expect(Math.round(meta.costPerUnit*100)).toBe(expectedCostPerUnit);
    expect(meta.weight).toBe(expectedWeight);
});

test('chocolatePaste calculate cost to make', ()=>{
    let expectedCost = 14;
    expect(Math.round(HW.calculateCostPerUnitHelper(chocolatePaste, chocolatePaste.weight) * 100)).toBe(expectedCost * 100);
});

test('chocolatePaste calculateCostPerUnit', ()=>{
    let expectedCost = 10.77;
    expect(Math.round(HW.calculateCostPerUnit(chocolatePaste)*100)).toBe(expectedCost * 100);
});

describe('testing raw ingredients calculateCostPerUnit', ()=>{
    test('test when cost is 0', ()=>{
        expect(HW.calculateCostPerUnit(ingredients[1])).toBe(0);
    });
    test('test Sugar cost is 10', ()=>{
        let expectedCost = 6.666;
        expect(Math.round(HW.calculateCostPerUnit(ingredients[2])*100)).toBe(Math.round(expectedCost * 100));
    });
})
