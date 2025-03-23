// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract TreeCoin is ERC20, Ownable, AccessControl {
    bytes32 public constant MINTER = keccak256("MINTER");
    bytes32 public constant ADMIN = keccak256("ADMIN");

    event newTransaction(address indexed sender, address recipient, uint256 amount);

    constructor(address owner) ERC20("Etreereum", "ETR") Ownable(owner) {
        _mint(owner, 10000000 * 10 ** 18);
    }

    function setAdmin(address account) public onlyOwner {
        grantRole(ADMIN, account);
    }

    function getBalance(address account) public view returns(uint256) {
        return balanceOf(account);
    }

    function transfer(address recipient, uint256 amount) override public returns(bool) {
        bool res = super.transfer(recipient, amount);
        emit newTransaction(msg.sender, recipient, amount);

        return res;
    }

    function giveReward(address recipient, uint256 amount) public onlyOwner() {
        super.transfer(recipient, amount);
        emit newTransaction(msg.sender, recipient, amount);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}

