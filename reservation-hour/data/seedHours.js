const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const { reservationSeed } = require('./seedReservations.js');

const genTimes = () => `0${faker.random.number({
    min: 5,
    max: 9,
  })}:00:00 - ${faker.random.number({ min: 15, max: 24 })}:00:00`;

const genRes = () => {
  const reservations = [];
  for (let i = 0; i < 10; i += 1) {
    const reservation = {
      reservee: faker.name.findName(),
      time: moment(faker.date.recent(90)).format('YYYY-MM-DD hh:mm:ss'),
    };
    reservations.push(reservation);
  }
  return JSON.stringify(reservations);
};

const hoursSeed = () => {
  const stream = fs.createWriteStream('hourstest2.csv');
  let i = 0;
  stream.write(
    'id|name|reservations|Monday,Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|restaurantId\n',
  );
  function write() {
    while (i < 10) {
      // 10 million hours
      i += 1;
      const string = `${i}|${faker.commerce.productName()}|${genRes()}|${genTimes()}|${genTimes()}|${genTimes()}|${genTimes()}|${genTimes()}|${genTimes()}|${genTimes()}|${i}\n`;
      if (!stream.write(string)) {
        return;
      }
    }
    stream.end();
  }
  stream.on('drain', () => {
    write();
  });
  write();
};

hoursSeed();

exports.hoursSeed = hoursSeed;
