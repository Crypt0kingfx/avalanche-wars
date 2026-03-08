// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AvalancheWars {

    address public owner;

    struct Player {
        uint256 powerScore;
        uint256 lastUpdated;
    }

    mapping(address => Player) public players;

    event ScoreUpdated(address indexed player, uint256 newScore);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function updateScore(address player, uint256 newScore) public onlyOwner {
        players[player].powerScore = newScore;
        players[player].lastUpdated = block.timestamp;

        emit ScoreUpdated(player, newScore);
    }

    function getScore(address player) public view returns (uint256) {
        return players[player].powerScore;
    }
}