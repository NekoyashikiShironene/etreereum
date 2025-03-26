// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract NFTree is ERC721, AccessControl  {
    uint256 private _nextTokenId;
    bytes32 public constant ADMIN = keccak256("ADMIN");
    address private _owner;

    event MintTree(address owner, uint256 plantedAt, string metadataURI, int24 latitude, int24 longitude);
    event BurnTree(address owner, uint256 tokenId, int24 latitude, int24 longitude);
    event ChangeOwner(address oldOwner, address newOwner);

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
    

    constructor(address owner) ERC721("NFTree", "NFT") {
        _owner = owner;
        _grantRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(ADMIN, owner);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    function grantAdmin(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ADMIN, account);
    }

    function revokeAdmin(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(account != _owner, "Can not revoke owner from admin role");
        revokeRole(ADMIN, account);
    }

    function getRoleName() public view returns(string memory) {
        if (hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            return "owner";
        }
        else if (hasRole(ADMIN, msg.sender)) {
            return "admin";
        }
        else {
            return "user";
        }
    }

    function getTokenOwner(uint256 tokenId) public view returns(address) {
        return ownerOf(tokenId);
    }

    function getTree(uint256 tokenId) public view returns(Tree memory) {
        return treeData[tokenId];
    }

    function getTrees(address treeOwner) public view returns(Tree[] memory) {
        uint256[] memory tokens = userOwnedTree[treeOwner];
        Tree[] memory trees = new Tree[](tokens.length);

        for (uint256 i=0; i<tokens.length; i++)
            trees[i] = treeData[tokens[i]];

        return trees;
    }

    function changeTreeOwner(uint256 tokenId, address newOwner) public {
        require(getTokenOwner(tokenId) == msg.sender, "Sender must be owner of the token");

        safeTransferFrom(msg.sender, newOwner, tokenId);
        userOwnedTree[newOwner].push(tokenId);

        // remove token from the old owner
        uint256 oldOwnerTreesLength = userOwnedTree[msg.sender].length;
        for (uint256 i=0; i<oldOwnerTreesLength; i++) {
            if (userOwnedTree[msg.sender][i] == tokenId) {
                userOwnedTree[msg.sender][i] = userOwnedTree[msg.sender][oldOwnerTreesLength - 1];
                userOwnedTree[msg.sender].pop();
                break;
            }
        }

        emit ChangeOwner(msg.sender, newOwner);

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
        emit MintTree(user, plantedAt, metadataURI, latitude, longitude);
    }

    function burnTree(uint256 tokenId) public onlyRole(ADMIN) {
        address treeOwner = getTokenOwner(tokenId);
        int24 latitude = treeData[tokenId].gpsLocation.latitude;
        int24 longitude = treeData[tokenId].gpsLocation.longitude;

        delete treeData[tokenId];
        _burn(tokenId);

        emit BurnTree(treeOwner, tokenId, latitude, longitude);
    }

}