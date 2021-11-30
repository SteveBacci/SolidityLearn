var BGT = artifacts.require("./BacciGoldToken.sol");
var BGTSales = artifacts.require("./BGTSale.sol");
var KycContract = artifacts.require("./KycContract.sol");

// conf .env to find config file
require("dotenv").config({path: "../.env"}); // puts env var into an object called process.env
console.log(process.env);


module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(BGT, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(BGTSales, 1, addr[0], BGT.address, KycContract.address);
 


    let tokenInstance = await BGT.deployed();
    await tokenInstance.transfer(BGTSales.address, process.env.INITIAL_TOKENS); // send all the tokens to the tokensale contract

};