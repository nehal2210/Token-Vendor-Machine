pragma solidity 0.8.18; //Do not change the solidity version as it negativly impacts submission grading
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "./YourToken.sol";

contract Vendor is Ownable {
    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
    event SellTokens(
        address buyer,
        uint256 amountOfETH,
        uint256 amountOfTokens
    );

    YourToken public yourToken;
    uint256 public constant tokensPerEth = 100;

    constructor(address tokenAddress) {
        yourToken = YourToken(tokenAddress);
    }

    function buyTokens() external payable {
        uint256 amount_eth = msg.value;
        uint256 amount = amount_eth * tokensPerEth;
        yourToken.transfer(msg.sender, amount);
        emit BuyTokens(msg.sender, msg.value, amount);
    }

    function withdraw() external onlyOwner {
        (bool sent, bytes memory data) = owner().call{
            value: address(this).balance
        }("");

        require(sent, "transfer failed");
    }

    function sellTokens(uint256 _amount) external payable {
        uint256 tokenAmount = _amount;
        uint256 eth_amount = tokenAmount / tokensPerEth;
        yourToken.transferFrom(msg.sender, address(this), tokenAmount);
        (bool sent, bytes memory data) = msg.sender.call{value: eth_amount}("");

        require(sent, "transfer failed");
        emit SellTokens(msg.sender, eth_amount, tokenAmount);
    }
    // ToDo: create a payable buyTokens() function:

    // ToDo: create a withdraw() function that lets the owner withdraw ETH

    // ToDo: create a sellTokens(uint256 _amount) function:
}
