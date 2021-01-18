'use strict';

const https = require('https');

module.exports.catFacts = async (event) => {
  let fact = '';

  const response = await new Promise((resolve, reject) => {
    const req = https.get('https://cat-fact.herokuapp.com/facts/random', (res) => {
      res.on('data', chunk => {
        fact += chunk;
        fact = JSON.parse(fact);
      })
      res.on('end', () => {
        resolve({
          statusCode: 200,
          catFact: fact.text
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
