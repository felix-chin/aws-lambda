'use strict';

const https = require('https');
const weatherKey = process.env.WEATHER_KEY;

module.exports.getWeather = async (event) => {
  let data = '';
  let zipcode = event['Details']['Parameters']['zipcode'];

  const response = await new Promise((resolve, reject) => {
    const req = https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=${weatherKey}&units=imperial`, (res) => {
      res.on('data', chunk => {
        data += chunk;
        data = JSON.parse(data);
      })
      res.on('end', () => {
        resolve({
          statusCode: 200,
          weather: `Today's temperature is ${data.main.temp} degrees`
        });
      });
    });

    req.on('error', (e) => {
      reject({
        statusCode: 500,
        body: 'An error occurred'
      });
    });
  });

  return response;
};
