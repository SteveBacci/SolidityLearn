pragma solidity ^0.6.0;

import "./Ownable.sol";
import "./Item.sol";




contract ItemManager is Ownable {
    
    enum SupplyChainSteps{Created, Paid, Delivered}
     uint itemIndex;
   
    event SupplyChainStep(uint _itemIndex, uint _step, address _address);
    
    
    
    struct S_Item {
        Item _item;
        string _identifier;
        ItemManager.SupplyChainSteps _step;
        
    }
    
    mapping(uint => S_Item) public items;
    
    
    function createItem(string memory _identifier, uint _itemPrice) public onlyOwner{
        Item item = new Item(this, _itemPrice, itemIndex);
        items[itemIndex]._item= item;
        items[itemIndex]._identifier = _identifier;
        items[itemIndex]._step = SupplyChainSteps.Created;
      
        emit SupplyChainStep(itemIndex, uint(items[itemIndex]._step), address(item));

          
        itemIndex++;
        

        
    }
    

    function triggerPayment(uint _index) public payable {

        uint price =items[_index]._item.priceInWei();
       require(msg.value >=price , "Not fully paid");
        require(items[_index]._step == SupplyChainSteps.Created, "Item is further in the supply chain");
        items[_index]._step = SupplyChainSteps.Paid;
        emit SupplyChainStep(_index, uint(items[_index]._step),address(items[itemIndex]._item));
        
    }
    
    function triggerDelivery(uint _index) public onlyOwner{
         require(items[_index]._step == SupplyChainSteps.Paid, "Item step != paid");
       
        
        items[_index]._step = SupplyChainSteps.Delivered;
          emit SupplyChainStep(_index, uint(items[_index]._step),address(items[_index]._item));
      
        
    }
 }
 
 
 