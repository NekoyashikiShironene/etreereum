// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol';

contract NFTree is ERC721, AccessControlEnumerable  {
    uint256 private _nextTokenId;
    bytes32 public constant ADMIN = keccak256("ADMIN");
    address private _owner;

    event GrantAdmin(address sender, address account);
    event RevokeAdmin(address sender, address account);
    event MintTree(address sender, address owner, uint256 plantedAt, string metadataURI, int32 latitude, int32 longitude);
    event BurnTree(address sender, address owner, uint256 tokenId, int32 latitude, int32 longitude);
    event ChangeOwner(address oldOwner, address newOwner);

    struct Coordinates {
        int32 latitude;
        int32 longitude;
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

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getAdmins() public view onlyRole(ADMIN) returns(address[] memory) {
        uint256 adminCount = getRoleMemberCount(ADMIN);
        address[] memory admins = new address[](adminCount);

        for (uint256 i = 0; i < adminCount; i++) {
            admins[i] = getRoleMember(ADMIN, i);
        }

        return admins;
    }
    
    function grantAdmin(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ADMIN, account);
        emit GrantAdmin(msg.sender, account);
    }

    function revokeAdmin(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(account != _owner, "Can not revoke owner from admin role");
        revokeRole(ADMIN, account);
        emit RevokeAdmin(msg.sender, account);
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


    function getAllTrees() public onlyRole(ADMIN) view returns(Tree[] memory) {
        Tree[] memory trees = new Tree[](_nextTokenId);

        for (uint256 i=0; i<_nextTokenId; i++)
            trees[i] = treeData[i];
            
        return trees;
    }

    function changeTreeOwner(uint256 tokenId, address newOwner) public {
        require(getTokenOwner(tokenId) == msg.sender, "Sender must be owner of the token");

        safeTransferFrom(msg.sender, newOwner, tokenId);
        userOwnedTree[newOwner].push(tokenId);

        // remove token from the owner
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
        int32 latitude,
        int32 longitude
    )  public onlyRole(ADMIN) {
        treeData[_nextTokenId] = Tree(_nextTokenId, plantedAt, metadataURI, Coordinates(latitude, longitude));
        _safeMint(user, _nextTokenId);
        userOwnedTree[user].push(_nextTokenId);
        _nextTokenId++;
        emit MintTree(msg.sender, user, plantedAt, metadataURI, latitude, longitude);
    }

    function burnTree(uint256 tokenId) public onlyRole(ADMIN) {
        address treeOwner = getTokenOwner(tokenId);
        int32 latitude = treeData[tokenId].gpsLocation.latitude;
        int32 longitude = treeData[tokenId].gpsLocation.longitude;

        delete treeData[tokenId];

        uint256 ownerTreesLength = userOwnedTree[treeOwner].length;
        for (uint256 i=0; i<ownerTreesLength; i++) {
            if (userOwnedTree[treeOwner][i] == tokenId) {
                userOwnedTree[treeOwner][i] = userOwnedTree[treeOwner][ownerTreesLength - 1];
                userOwnedTree[treeOwner].pop();
                break;
            }
        }

        _burn(tokenId);



        emit BurnTree(msg.sender, treeOwner, tokenId, latitude, longitude);
    }

}