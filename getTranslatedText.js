'use strict';

const https = require('https');
const email = process.env.EMAIL;

module.exports.translateText = async (event) => {
  let text = '';
  const receivedAttribute = event['Details']['Parameters']['translateThis'];

  const response = await new Promise((resolve, reject) => {
    const req = https.get(`https://api.mymemory.translated.net/get?q=${receivedAttribute}&langpair=en|es&de=${email}`, (res) => {
      res.on('data', chunk => {
        text += chunk;
        text = JSON.parse(text);
      })
      res.on('end', () => {
        resolve({
          statusCode: 200,
          translatedText: text.responseData.translatedText
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
