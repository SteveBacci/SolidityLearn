const path = require("path");
require('dotenv').config({path: './.env'});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545,
      network_id: "5777",
      host: "127.0.0.1"
    
    },
    ganache: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:8545", MetaMaskAccountIndex )
      },
      port: 8545,
      network_id: "1337",
      host: "127.0.0.1"
    },
    goerli_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "wss://goerli.infura.io/ws/v3/605c3dfdd9cd4c15bb731ecf182f201e", MetaMaskAccountIndex )
      },
      network_id: "5"

    },
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "wss://ropsten.infura.io/ws/v3/605c3dfdd9cd4c15bb731ecf182f201e", MetaMaskAccountIndex )
      },
      network_id: "3",
    }
  },
  compilers: {    
    solc: {
    version: "^0.6.1"
    }
}
};
