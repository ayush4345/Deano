// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;'


interface Faucet {
        requestTokens(uint256 amount) external;
        tranferToPool(uint256 amount) external;
}