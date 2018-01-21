'use strict';

var chalk = require('chalk');

var request = require('request');
//https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
function convert() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var url = 'https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=' + currency + '&amount=' + amount;

  request(url, function (err, response, body) {
    var apiResponse = void 0;
    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      return parseError;
    }
    console.log(chalk.red(amount) + ' BTC to ' + chalk.cyan(currency) + ' = ' + chalk.green(apiResponse.price));
  });
}

module.exports = convert;