
const BGT = artifacts.require("BacciGoldToken");
const BGTSale = artifacts.require("BGTSale");
const KycContract = artifacts.require("KycContract");

const { assert } = require("chai");

const  chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;


require("dotenv").config({path: "../.env"}); // puts env var into an object called process.env

contract("Token Test", async (accounts) => {

    // can define accounts instead of using array indexing eg accounts[0]

    const [ deployeraccount, recipient, anotherAccount ] = accounts;

    it ("should not have any tokens in my deployeraccount", async () => {
        // let instance = await this.myBGT.deployed(
          let instance = await BGT.deployed();

          expect(instance.balanceOf(deployeraccount)).to.eventually.be.a.bignumber.equal(new BN(0));

 
    });

    it("all coins should be in the tokensale smart contract", async () => {
        let instance = await BGT.deployed();
        let balance = await instance.balanceOf.call(BGTSale.address);
        let totalSupply = await instance.totalSupply.call();
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });
    

    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let tokenInstance = await BGT.deployed();
        let tokenSaleInstance = await BGTSale.deployed();
        let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
        await expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    
        let kycInstance = await KycContract.deployed();
        await kycInstance.setKycCompleted(recipient);
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    
    });
    

});



