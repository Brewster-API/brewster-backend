const drinks = [
  {
    id: 1,
    drinkName: 'Black',
    brew: 'drip',
    description:
      'Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: cafe noir.',
    ingredients: ['Coffee'],
  },
  {
    id: 2,
    drinkName: 'Latte',
    brew: 'espresso',
    description:
      'As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice.',
    ingredients: ['Espresso', 'Steamed Milk'],
  },
  {
    id: 3,
    drinkName: 'Cappuccino',
    brew: 'espresso',
    description:
      'Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top. Sometimes you can find variations that use cream instead of milk or ones that throw in flavor shot, as well.',
    ingredients: ['Espresso', 'Steamed Milk', 'Foam'],
  },
  {
    id: 4,
    drinkName: 'Americano',
    brew: 'espresso',
    description:
      'With a similar flavor to black coffee, the americano consists of an espresso shot diluted in hot water.',
    ingredients: ['Espresso', 'Hot Water'],
  },
  {
    id: 5,
    drinkName: 'Espresso',
    brew: 'espresso',
    description:
      'An espresso shot can be served solo or used as the foundation of most coffee drinks, like lattes and macchiatos.',
    ingredients: ['1oz Espresso'],
  },
  {
    id: 6,
    drinkName: 'Doppio',
    brew: 'espresso',
    description:
      'A double shot of espresso, the doppio is perfect for putting extra pep in your step.',
    ingredients: ['2oz Espresso'],
  },
  {
    id: 7,
    drinkName: 'Cortado',
    brew: 'espresso',
    description:
      'Like yin and yang, a cortado is the perfect balance of espresso and warm steamed milk. The milk is used to cut back on the espresso’s acidity.',
    ingredients: ['1oz Espresso', '1oz Steamed Milk'],
  },
  {
    id: 8,
    drinkName: 'Red Eye',
    brew: 'espresso',
    description:
      'Named after those pesky midnight flights, a red eye can cure any tiresome morning. A full cup of hot coffee with an espresso shot mixed in, this will definitely get your heart racing.',
    ingredients: ['Coffee', 'Espresso'],
  },
  {
    id: 9,
    drinkName: 'Galão',
    brew: 'espresso',
    description:
      'Originating in Portugal, this hot coffee drink is closely related to the latte and cappuccino. Only difference is it contains about twice as much foamed milk, making it a lighter drink compared to the other two.',
    ingredients: ['Espresso', 'Foamed milk'],
  },
  {
    id: 10,
    drinkName: 'Lungo',
    brew: 'espresso',
    description:
      'A lungo is a long-pull espresso. The longer the pull, the more caffeine there is and the more ounces you can enjoy.',
    ingredients: ['Long pulled espresso'],
  },
  {
    id: 11,
    drinkName: 'Macchiato',
    brew: 'espresso',
    description:
      'The macchiato is another espresso-based drink that has a small amount of foam on top. It’s the happy medium between a cappuccino and a doppio.',
    ingredients: ['Espresso', 'Foam'],
  },
  {
    id: 12,
    drinkName: 'Mocha',
    brew: 'espresso',
    description:
      'For all you chocolate lovers out there, you’ll fall in love with a mocha (or maybe you already have). The mocha is a chocolate espresso drink with steamed milk and foam.',
    ingredients: ['Espresso', 'Steamed Milk', 'Chocolate'],
  },
  {
    id: 13,
    drinkName: 'Ristretto',
    brew: 'espresso',
    description:
      'Ristretto is an espresso shot. It uses less hot water which creates a sweeter flavor compared to the bitter taste of a traditional shot of espresso or a doppio.',
    ingredients: ['Short pulled espresso'],
  },
  {
    id: 14,
    drinkName: 'Flat White',
    brew: 'espresso',
    description:
      'This Aussie-born drink is basically a cappuccino without the foam or chocolate sprinkle. It’s an espresso drink with steamed milk.',
    ingredients: ['Espresso', 'Steamed Milk'],
  },
  {
    id: 15,
    drinkName: 'Affogato',
    brew: 'espresso',
    description:
      'The affogato is an excuse to enjoy a scoop of ice cream any time of day (and any time of year in my opinion). Served with a scoop of ice cream and a shot of espresso, or two.',
    ingredients: ['Espresso', 'Ice cream'],
  },
  {
    id: 16,
    drinkName: 'Café au Lait',
    brew: 'drip',
    description:
      'Café au lait is perfect for the coffee minimalist who wants a bit more flavor. Just add a splash of warm milk to your coffee and you’re all set!',
    ingredients: ['Coffee', 'Steamed Milk'],
  },
  {
    id: 17,
    drinkName: 'Irish',
    brew: 'drip',
    description:
      'Irish coffee consists of black coffee, whiskey and sugar, topped with whipped cream.',
    ingredients: ['Coffee', 'Whiskey', 'Sugar', 'Cream'],
  },
  {
    id: 18,
    drinkName: 'Guayoyo',
    brew: 'drip',
    description:
      'Traditional venezuelan coffee prepared by filtering the ground coffee in a cone of cloth and pouring hot water on top of it. Its prefferably drinked wihout milk nor cream.',
    ingredients: ['Coffee', 'Traditional', 'Hot Water'],
  },
  {
    id: 19,
    drinkName: 'Cortadito',
    brew: 'espresso',
    description:
      'Traditional cuban coffee method where a bit of freshly brewed coffee is mixed with sugar to create a highly sugared paste. Then add the rest of the coffee and stir adding milk until a 50/50 ratio is achieved.',
    ingredients: ['Coffee', 'Traditional', 'Sugar', 'Milk'],
  },
  {
    id: 20,
    drinkName: 'Aguapanela Coffee',
    brew: 'drip',
    description:
      'Bring panela and coffee to a boil in a small pan for 30 minutes until panela is melted. Brew your coffee using your favorite brewing technique but add the hot aguapanela instead of hot water. Delicious sweetened coffee is ready.',
    ingredients: ['Coffee', 'Sweet', 'Panela', 'Traditional'],
  },
  {
    id: 21,
    drinkName: 'Cafe Bombon',
    brew: 'espresso',
    description:
      'Created in Spain, this espresso drink is made with sweetened condensed milk in a 1:1 ratio.',
    ingredients: ['Coffee', 'Sweetened condensed milk'],
  },
  {
    id: 22,
    drinkName: 'Caffe Gommosa',
    brew: 'espresso',
    description:
      'A single espresso shot that\'s poured over a single marshmallow.',
    ingredients: ['Coffee', 'Marshmallow'],
  },
  {
    id: 23,
    drinkName: 'Galao',
    brew: 'espresso',
    description:
      'A Portuguese drink made with espresso and foamed milk served in a tall glass.',
    ingredients: ['Coffee', 'Milk'],
  },
  {
    id: 24,
    drinkName: 'Doppio',
    brew: 'espresso',
    description:
      'A double shot of espresso that’s served in a demitasse cup (a small, single-serve cup).',
    ingredients: ['Espresso Coffee'],
  },
  {
    id: 25,
    drinkName: 'Espresso Romano',
    brew: 'espresso',
    description:
      'A shot of espresso with a slice of lemon on the side.',
    ingredients: ['Espresso Coffee', 'Lemon'],
  },
  {
    id: 26,
    drinkName: 'Black Tie',
    brew: 'espresso',
    description:
      'A drink made by combining a double shot of espresso (or strong coffee) with traditional Thai iced tea (a mixture of black tea, spices, and condensed milk or cream).',
    ingredients: ['Espresso Coffee', 'Chai Tea', 'Condensed Milk'],
  },
  {
    id: 27,
    drinkName: 'Dirty Chai Latte',
    brew: 'espresso',
    description:
      'A drink combining a regular caffè latte with chai spiced tea.',
    ingredients: ['Espresso Coffee', 'Chai Tea'],
  },
  {
    id: 28,
    drinkName: 'Yuenyeung',
    brew: 'drip',
    description:
      'A popular drink in Hong Kong made by combining coffee and Hong Kong-style milk tea.',
    ingredients: ['Espresso Coffee', 'Milk Tea'],
  },
  {
    id: 29,
    drinkName: 'Caffè Corretto',
    brew: 'espresso',
    description:
      'An Italian drink combining a shot of espresso that’s “corrected” with a shot of liquor (usually brandy, grappa, sambuca.)',
    ingredients: ['Espresso Coffee', 'Liquor'],
  },
  {
    id: 30,
    drinkName: 'Rüdesheimer Kaffee',
    brew: 'drip',
    description:
      'Deriving from Rüdesheim, Germany, this drink is made with coffee, sugar, and Asbach Uralt brandy, and topped with whipped cream.',
    ingredients: ['Coffee', 'Asbach Uralt brandy', 'Whipped Cream', 'Sugar'],
  },
  {
    id: 31,
    drinkName: 'Pharisee',
    brew: 'drip',
    description:
      'Served in a mug, this popular drink from north frisian Island in Nordstrand, Germany is made with black coffee, a double shot of rum, and whipped cream topping.',
    ingredients: ['Coffee', 'Rum', 'Whipped Cream'],
  },
  {
    id: 32,
    drinkName: 'Barraquito',
    brew: 'espresso',
    description:
      'A traditional drink from Tenerife (Canary Islands), mixing Licor 43 with espresso, foamed milk, condensed sweetened milk, cinnamon and lemon.',
    ingredients: ['Espresso Coffee', 'Licor 43', 'Milk', 'Condensed Sweetened Milk', 'Cinnamon', 'Lemon'],
  },
  {
    id: 33,
    drinkName: 'Carajillo',
    brew: 'espresso',
    description:
      'A Spanish drink that combines coffee with either rum, whiskey, brandy or anisette.',
    ingredients: ['Espresso Coffee', 'Liquor'],
  },
  {
    id: 34,
    drinkName: 'Spanish Coffee',
    brew: 'espresso',
    description:
      'An American take on the "Carajillo" that originated at Huber’s Cafe in Portland, Oregon in the 1970s. A coffee/alcohol combination served in a sugar-rimmed mug that is flamed to caramelize the sugar and then topped with whipped cream.',
    ingredients: ['Espresso Coffee', 'Liquor', 'Whipped Cream'],
  },
  {
    id: 35,
    drinkName: 'Irish coffee',
    brew: 'drip',
    description:
      'A drink combining coffee, whiskey, cream and sometimes sugar.',
    ingredients: ['Coffee', 'Liquor', 'Cream'],
  },
  {
    id: 36,
    drinkName: 'Irish coffee',
    brew: 'drip',
    description:
      'A drink combining coffee, whiskey, cream and sometimes sugar.',
    ingredients: ['Coffee', 'Liquor', 'Cream'],
  },
];

export default drinks;
