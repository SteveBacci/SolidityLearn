import React, { Component } from "react";
import getWeb3 from "./getWeb3";

import BGT_Token from "./contracts/BacciGoldToken.json"
import BGT_TokenSale from "./contracts/BGTSale.json"
import KycContract from "./contracts/KycContract.json"


import "./App.css";

class App extends Component {

  // not great design to have web3 state in the main app class - better to have a distinct class 
  //state = { storageValue: 0, web3: null, accounts: null, contract: null };
  state = { loaded: false, kycAddress: "0x123" };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      //this.networkId = await this.web3.eth.net.getId();

      this.networkId = await this.web3.eth.getChainId();      
     this.tokenInstance = new this.web3.eth.Contract(
        BGT_Token.abi,
        BGT_Token.networks[this.networkId] && BGT_Token.networks[this,this.networkId].address
      );
      this.tokenSaleInstance = new this.web3.eth.Contract(
        BGT_TokenSale.abi,
        BGT_TokenSale.networks[this.networkId] && BGT_TokenSale.networks[this,this.networkId].address
      );
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this,this.networkId].address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({loaded:true });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKycSubmit = async () => {
    const {kycAddress} = this.state;
    await this.kycInstance.methods.setKycCompleted(kycAddress).send({from: this.accounts[0]});
    alert("Account "+kycAddress+" is now whitelisted");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Bacci Gold Token</h1>
        <p>Get your Tokens!</p>
        <h2>Kyc Whitelisting</h2>

    
        <h2>Enable your account</h2>
        Address to allow: <input type="text" enabled="true" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleKycSubmit}>Add Address to Whitelist</button>
      </div>
    
    );
  }
}
export default App;
