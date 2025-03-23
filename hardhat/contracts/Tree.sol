// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract NFTree is ERC721, AccessControl, Ownable {
    uint256 private _nextTokenId;
    bytes32 public constant ADMIN = keccak256("ADMIN");

    event newTree(address user, uint256 plantedAt, string metadataURI, bool treeStatus, int24 latitude, int24 longtitude);

    struct Coordinates {
        int24 latitude;
        int24 longtitude;
    }
    
    struct Tree {
        uint256 plantedAt;
        string metadataURI;
        bool treeStatus;
        Coordinates gpsLocation;
    }

    mapping(uint256 => Tree) public trees;

    constructor(address owner) ERC721("NFTree", "NFT") Ownable(owner) {
        grantRole(ADMIN, owner);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mintTree(
        address user,
        uint256 plantedAt,
        string memory metadataURI,
        bool treeStatus,
        int24 latitude,
        int24 longtitude
    )  public onlyRole(ADMIN) {
        trees[_nextTokenId] = Tree(plantedAt, metadataURI, treeStatus, Coordinates(latitude, longtitude));
        _safeMint(user, _nextTokenId);
        _nextTokenId++;
        emit newTree(user, plantedAt, metadataURI, treeStatus, latitude, longtitude);
    }

    function getOwner(uint256 tokenId) public view returns(address) {
        return ownerOf(tokenId);
    }

    function setAdmin(address account) public onlyOwner {
        grantRole(ADMIN, account);
    }

    
}