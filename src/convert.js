const chalk = require('chalk');
const ora = require('ora');
const request = require('request');

const spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'yellow',
});

//https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
function convert(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
  spinner.start();

  request(url, (err, response, body) => {
    let apiResponse;
    spinner.stop();
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
