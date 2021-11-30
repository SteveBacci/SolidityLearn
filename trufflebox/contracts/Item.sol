pragma solidity ^0.6.0;
import "./ItemManager.sol";

contract Item {
    uint public priceInWei;
    uint public index;
    uint public pricePaid;
    uint public test;
    
    
    ItemManager parentContract;
    
    constructor(ItemManager _parentContract, uint _priceInWei, uint _index) public{
        priceInWei= _priceInWei;
        index  = _index;
        parentContract = _parentContract;
        
    
    }
    receive() external payable {
        require(pricePaid == 0, "Item is alread paid!");
        require(priceInWei == msg.value, "Only full payments allowed");
        pricePaid += msg.value;
        // use call value instead of transfer to get return value
        // use low level function as need more gas for functionality in target functionality
        // invoke the triggerPayment function and pick up return code

        // no return values, just the return code
        (bool success,) = address(parentContract).call.value(msg.value)(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "the transaction was not sucessful, cancelling");
    }
    
    fallback() external {}
    
}