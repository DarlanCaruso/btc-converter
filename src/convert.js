const chalk = require('chalk');
const ora = require('ora');
const request = require('request-promise-native');

const spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'yellow',
});

// https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
function convert(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
  spinner.start();

  return request(url)
    .then((body) => {
      spinner.stop();
      return body;
    })
    .then((body) => {
      const apiResponse = JSON.parse(body);
      console.info(`${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.green(apiResponse.price)}`);
    })
    .catch((err) => {
      spinner.stop();
      console.info(chalk.red('Something went wrong in the API. Try again in a few minutes.'));
      return err;
    });
}

module.exports = convert;
