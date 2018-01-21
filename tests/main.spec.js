const expect = require('chai').expect;
const exec = require('child_process').exec;
const btcConverter = 'node.exe ./src/main.js';
const pkg = require('../package.json');

describe('Main CLI', () => {
  it('should return Hello World', (done) => {
    exec(`${btcConverter} --version`, (err, stdout, stderr) => {
      if(err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    })
  });
  it('should return currency as option', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if(err) throw err;
      expect(stdout.includes('--currency')).to.be.true;
      done();
    })
  });
  it('should return amount as option', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if(err) throw err;
      expect(stdout.includes('--amount')).to.be.true;
      done();
    })
  });
});