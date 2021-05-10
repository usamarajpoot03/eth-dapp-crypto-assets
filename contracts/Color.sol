pragma solidity ^0.6.2;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "./ERC721Full.sol";

contract Color is ERC721 {

    string[] public colors;
    uint _id;
    mapping(string => bool) isColorExists;

    constructor () ERC721("Color", "COLOR")  public {  
    }

    function mint(string memory _color) public {

       require(!isColorExists[_color]); 
       colors.push(_color);
       _mint(msg.sender, _id);
       _id++;
       isColorExists[_color]= true;
    }
}