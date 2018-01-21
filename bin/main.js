#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');
var convert = require('./convert');

program.version(pkg.version).description('Convert Bitcoin to any currency provided').option('-C, --currency <currency>', 'Choice the currency to convert (default: USD)').option('-A, --amount <amount>', 'Choice the amount of Bitcoin (default: 1)').parse(process.argv);

convert(program.currency, program.amount);