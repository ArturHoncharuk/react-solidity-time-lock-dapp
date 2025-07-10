// contracts/contracts/TimeLock.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TimeLock {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public lockTime;

    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed to, uint256 amount);

    function deposit() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 days; // Locks for 24 hours
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw() external {
        require(balances[msg.sender] > 0, "No funds to withdraw");
        require(block.timestamp >= lockTime[msg.sender], "Funds are still locked");
        
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdraw(msg.sender, amount);
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function getLockTime() external view returns (uint256) {
        return lockTime[msg.sender];
    }
}