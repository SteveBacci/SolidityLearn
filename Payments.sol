//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract MappingsStructExample {

    mapping(address => uint) public balances;




    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function sendMoney() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawMoney(address payable _to, uint amt) public {
        try
        require(amt <= balances[msg.sender], "Address supplied has insufficient funds" );
        uint senderBal = balances[msg.sender];
        
        if (amt <= senderBal )
        {
            balances[msg.sender] -= amt;
            _to.transfer(amt);
        }
        
            
        
    }
    function withdrawAllMoney(address payable _to) public {
        _to.transfer(address(this).balance);
    }
}

