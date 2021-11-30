/* var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
 */

const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer, network, accounts) {
  // Deploy the Migrations contract as our only task
  await deployer.deploy(Migrations);
};