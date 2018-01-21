const chalk = require('chalk');

const request = require('request');
//https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
function convert(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  request(url, (err, response, body) => {
    let apiResponse;
    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      return parseError;
    }
    console.log(`${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.green(apiResponse.price)}`);
  });
}

module.exports = convert;
