'use strict';

var chalk = require('chalk');
var ora = require('ora');
var request = require('request-promise-native');

var spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'yellow'
});

// https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
function convert() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var url = 'https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=' + currency + '&amount=' + amount;
  spinner.start();

  return request(url).then(function (body) {
    spinner.stop();
    return body;
  }).then(function (body) {
    var apiResponse = JSON.parse(body);
    console.log(chalk.red(amount) + ' BTC to ' + chalk.cyan(currency) + ' = ' + chalk.yellow(apiResponse.price));
  }).catch(function (err) {
    spinner.stop();
    console.log(chalk.red('Something went wrong in the API. Try again in a few minutes.'));
    return err;
  });
}

module.exports = convert;