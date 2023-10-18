// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {Payout} from "../src/Payout.sol";

contract DeployPayout is Script {
  function run() public {
    vm.startBroadcast();
    Payout payout = new Payout("DeanoPayout", "DAN");
    console.log("Payout Contract deployed at", address(payout));
    vm.stopBroadcast();
  }
}
