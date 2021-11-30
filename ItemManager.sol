//SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;


contract Ownable {
    address payable _owner;
    constructor() public {
      _owner = msg.sender;
      
    }
    
    modifier onlyOwner() {
        require(isOwner(), "You are not the owner");
        _;
    }
    
    function isOwner() public view returns(bool){
        return (msg.sender == _owner);
    }
}

contract Item {
    uint public priceInWei;
    uint public index;
    uint public pricePaid;
    
    
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
        (bool sucess,) = address(parentContract).call.value(msg.value)(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(sucess, "the transaction was not sucessful, cancelling");
    }
    
    fallback() external {}
    
}

contract ItemManager is Ownable{
    
    enum SupplyChainState{Created, Paid, Delivered}
     uint itemIndex;
   
    event SupplyChainStep(uint _itemIndex, uint _step, address _itemAddress);
    
    
    
    struct S_Item {
        Item _item;
        string _identifier;
        uint _itemPrice;
        ItemManager.SupplyChainState _state;
    }
    
    mapping(uint => S_Item) public items;
    
    
    function createItem(string memory _identifier, uint _itemPrice) public onlyOwner{
        Item item = new Item(this, _itemPrice, itemIndex);
        items[itemIndex]._item= item;
        items[itemIndex]._identifier = _identifier;
        items[itemIndex]._itemPrice = _itemPrice;
        items[itemIndex]._state = SupplyChainState.Created;
        
        emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state), address(items[itemIndex]._item)); // emit address of item for payment!
          
        itemIndex++;
        
        
        
    }
    
    function triggerPayment(uint _itemIndex) public payable {
        require(items[_itemIndex]._itemPrice == msg.value, "Msg value != Item Price");
        require(items[_itemIndex]._state == SupplyChainState.Paid, "Item state != created");
        
        items[_itemIndex]._state = SupplyChainState.Paid;
        emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state), address(items[_itemIndex]._item));
        
        
        
    }
    
    function triggerDelivery(uint _itemIndex) public onlyOwner{
         require(items[_itemIndex]._state == SupplyChainState.Paid, "Item state != paid");
       
        
        items[_itemIndex]._state = SupplyChainState.Delivered;
          emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state), address(items[_itemIndex]._item));
      
        
    }
 }
 
 
 
 