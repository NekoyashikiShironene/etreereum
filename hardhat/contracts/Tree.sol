// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract NFTree is ERC721, Ownable, AccessControl  {
    uint256 private _nextTokenId;
    bytes32 public constant ADMIN = keccak256("ADMIN");

    event newTree(address user, uint256 plantedAt, string metadataURI, int24 latitude, int24 longitude);

    struct Coordinates {
        int24 latitude;
        int24 longitude;
    }
    
    struct Tree {
        uint256 tokenId;
        uint256 plantedAt;
        string metadataURI;
        Coordinates gpsLocation;
    }

    mapping(uint256 => Tree) public treeData;
    mapping(address => uint256[]) public userOwnedTree;

    constructor(address owner) ERC721("NFTree", "NFT") Ownable(owner) {
        _grantRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(ADMIN, owner);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mintTree(
        address user,
        uint256 plantedAt,
        string memory metadataURI,
        int24 latitude,
        int24 longitude
    )  public onlyRole(ADMIN) {
        treeData[_nextTokenId] = Tree(_nextTokenId, plantedAt, metadataURI, Coordinates(latitude, longitude));
        _safeMint(user, _nextTokenId);
        _nextTokenId++;
        userOwnedTree[user].push(_nextTokenId);
        
        emit newTree(user, plantedAt, metadataURI, latitude, longitude);
    }

    function getOwner(uint256 tokenId) public view returns(address) {
        return ownerOf(tokenId);
    }

    function setAdmin(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ADMIN, account);
    }

    
}