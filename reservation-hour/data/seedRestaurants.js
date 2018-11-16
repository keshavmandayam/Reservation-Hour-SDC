const fs = require('fs');
const faker = require('faker');
const { hoursSeed } = require('./seedHours.js');

const restaurantSeed = () => {
  const stream = fs.createWriteStream('data/restaurants.csv');
  let i = 0;
  stream.write('name\n');
  function write() {
    while (i < 10000000) {
      // 10 million restaurants
      i += 1;
      if (!stream.write(`${faker.commerce.productName()}\n`)) {
        return;
      }
    }
    stream.end(hoursSeed());
  }
  stream.on('drain', () => {
    write();
  });
  write();
};

restaurantSeed();
