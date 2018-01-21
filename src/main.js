#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const convert = require('./convert');

program
  .version(pkg.version)
  .description('Convert Bitcoin to any currency provided')
  .option('-C, --currency <currency>', 'Choice the currency to convert (default: USD)')
  .option('-A, --amount <amount>', 'Choice the amount of Bitcoin (default: 1)')
  .parse(process.argv);

convert(program.currency, program.amount);
