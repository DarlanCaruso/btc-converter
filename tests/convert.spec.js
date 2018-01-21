const chai = require('chai');
const expect = chai.expect;
const convert = require('../src/convert');
const nock = require('nock');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chalk = require('chalk');

chai.use(sinonChai);

describe('Convert Function', () => {
  let consoleStub;

  const response = {
    "time": "2018-01-21 18:24:52",
    "success": true,
    "price": 11353.21
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should return the correct value', (done) => {
    //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, response);

    convert();
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.green(response.price)}`);
      done();
    }, 300);
  });

  it('should return the correct value passed currency parameter', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, response);

    convert('BRL');
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.green(response.price)}`);
      done();
    }, 300);
  });

  it('should return the correct value passed currency and amount parameter', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 2 })
      .reply(200, response);

    convert('BRL', 2);
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(2)} BTC to ${chalk.cyan('BRL')} = ${chalk.green(response.price)}`);
      done();
    }, 300);
  });

  it('should return the correct message if have a error', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 2 })
      .replyWithError('Error');

    convert('BRL', 2);
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(chalk.red(`Something went wrong in the API. Try in a few minutes.`));
      done();
    }, 300);
  });
});
