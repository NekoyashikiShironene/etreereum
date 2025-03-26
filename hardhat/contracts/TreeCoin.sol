// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.20;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract TreeCoin is ERC20, AccessControl {
    bytes32 public constant ADMIN = keccak256("ADMIN");
    address private _owner;

    event NewTransaction(address sender, address recipient, uint256 amount);

    constructor(address owner) ERC20("Etreereum", "ETR") {
        _owner = owner;
        _grantRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(ADMIN, owner);
        _mint(owner, 10000000 * 10 ** 18);
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

    function getBalance(address account) public view returns(uint256) {
        return balanceOf(account);
    }

    function transfer(address recipient, uint256 amount) public override returns(bool) {
        bool res = super.transfer(recipient, amount);
        emit NewTransaction(msg.sender, recipient, amount);
        return res;
    }

    function giveReward(address recipient, uint256 amount) public onlyRole(ADMIN) {
        approve(address(this), amount);
        super.transferFrom(_owner, recipient, amount);
        emit NewTransaction(msg.sender, recipient, amount);
    }

    function mint(address account, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _burn(account, amount);
    }
}

