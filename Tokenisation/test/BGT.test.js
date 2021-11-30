// SPDX-License-Identifier: MIT

const Token = artifacts.require("BacciGoldToken");


const { assert } = require("chai");

const  chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

// also may want to use https://github.com/rkalis/truffle-assertions,


// The truffle tests setup is not really suitable if you want to test specific scenarios which are not covered by the migration files.
// After migrating a smart contract, it usually ends up in a specific state. So testing the Token Smart Contract in this way wouldn't be possible anymore. You would have to test the whole token-sale, but that's something not what we want.
// We could also integrate the openzeppelin test environment. It's blazing fast and comes with an internal blockchain for testing.
// But it has one large drawback: It only let's you use the internal blockchain, it's not configurable so it would use an outside blockchain. That's why I would still opt to use the Truffle Environment.

contract("Token Test", async (accounts) => {

// can define accounts instead of using array indexing eg accounts[0]

    const [ initialHolder, recipient, anotherAccount ] = accounts;

    // hook run before each test (it) below
    beforeEach(async() => {
        this.myBGT = await Token.new(1000000);
        // change all occurances of 
    })

    it ("all tokens should be in my account", async () => {
       // let instance = await this.myBGT.deployed(
         let instance = this.myBGT;

        let totalSupply = await instance.totalSupply();
       
        // or

        expect( instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);

    })

        // BN is a java class for numbers

    it("I can send tokens from Account 1 to Account 2", async () => {
        const sendTokens = 1;
        //let instance = await this.myBGT.deployed();
        let instance = this.myBGT;
         
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;      
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
      });

   it("It's not possible to send more tokens than account 1 has", async () => {
      //let instance = await this.myBGT.deployed();
      let instance = this.myBGT;
         
      let balanceOfAccount = await instance.balanceOf(initialHolder);
      await expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;

      //check if the balance is still the same
      await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);

    });

});


