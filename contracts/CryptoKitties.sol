pragma solidity ^0.6.2;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CryptoKitties is ERC721, VRFConsumerBase, Ownable {
    using SafeMath for uint256;
    using Strings for string;

    address public VRFCoordinator;
    address public LinkToken;
    bytes32 public keyHash;
    uint256 internal fee;

    mapping(bytes32 => string) public requestToCharacterName;
    mapping(bytes32 => address) public requestToSender;


    struct Kitty {
        uint256 strength;
        uint256 loyality;
        uint256 stamina;
        uint256 intelligence;
        string name;
    }

    Kitty[] public kitties;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash) public
            VRFConsumerBase(_VRFCoordinator, _LinkToken)
            ERC721("Kitties", "KIT") {

        VRFCoordinator = _VRFCoordinator;
        LinkToken = _LinkToken;
        keyHash = _keyhash;

        fee = 0.1 * 10 ** 18;
    }

    function generateNewRandomKitty(uint256 _userProvidedSeed, string memory _name) public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with LINK TOKENS"
        );

        bytes32 requestId = requestRandomness(keyHash, fee, _userProvidedSeed);
        requestToCharacterName[requestId] = _name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        uint256 newId = kitties.length;
        uint256 strength = (randomNumber % 100);
        uint256 loyality = ((randomNumber % 10000) / 100 );
        uint256 stamina = ((randomNumber % 1000000) / 10000 );
        uint256 intelligence = ((randomNumber % 100000000) / 1000000 );

        _safeMint(requestToSender[requestId], newId);

        kitties.push(
            Kitty(
                strength,
                loyality,
                stamina,
                intelligence,
                requestToCharacterName[requestId]
                )
        );
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }

    function getNumberOfKitties() public view returns (uint256) {
        return kitties.length;
    }

   function getKittyStats(uint256 tokenId)
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            kitties[tokenId].name,
            kitties[tokenId].strength,
            kitties[tokenId].loyality,
            kitties[tokenId].stamina,
            kitties[tokenId].intelligence
        );
    }

    function sqrt(uint256 x) internal view returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}