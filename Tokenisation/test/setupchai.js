
"use strict"
var chai = require("chai");
const BN = web3.utils.BN;


// load module and use
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

// load module and use
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

module.exports = chai;

