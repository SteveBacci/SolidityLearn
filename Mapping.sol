// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract SimpleMappingExample {

    mapping(uint => bool) public myMapping;
    mapping(address => bool) public myAddressMapping;


    mapping (uint => mapping(uint => bool)) uintUintBoolMapping;
    
    
    function setValue(uint _index) public {
        myMapping[_index] = true;
    }

    function setMyAddressToTrue() public {
        myAddressMapping[msg.sender] = true;
    }


 
}