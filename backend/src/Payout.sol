// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "forge-std/console.sol";
import "sismo-connect-solidity/SismoConnectLib.sol";

contract Payout is ERC20, SismoConnect {
  error AlreadyClaimed();
  using SismoConnectHelper for SismoConnectVerifiedResult;

  event MoneyReceived(address indexed _from, uint256 _amount);
  event MoneySent(address indexed _to, uint256 _amount);

  mapping(uint256 => uint) public claimed;
  bytes16 public constant DEANO_ANNOTATORS_GROUP_ID = 0x390f865ab67200e84079573e5de40d56;
  bytes16 private _appId = 0xf4977993e52606cfd67b7a1cde717069;

  bool private _isImpersonationMode = false;
  uint public allowancePeriodInDays = 7 days;

  constructor(
    string memory name,
    string memory symbol
  ) ERC20(name, symbol) SismoConnect(buildConfig(_appId, _isImpersonationMode)) {}

  function depositBounty(uint _amount) public returns (bool) {
    require(balanceOf(msg.sender) >= _amount, "amount greater than balance");
    _burn(msg.sender, _amount);
    emit MoneyReceived(msg.sender, _amount);
    return true;
  }

  function _getRewardAmount(
    SismoConnectVerifiedResult memory result
  ) private pure returns (uint256) {
    uint256 payoutAmount = 0;
    uint256 baseAmount = 100 * 10 ** 18;

    // we iterate over the verified claims in the result
    for (uint i = 0; i < result.claims.length; i++) {
      bytes16 groupId = result.claims[i].groupId;
      uint256 value = result.claims[i].value;
      if (groupId == DEANO_ANNOTATORS_GROUP_ID) {
        // we multiply the base amount by the reputation value of the claim
        payoutAmount += value * baseAmount;
      }
    }
    return payoutAmount;
  }

  function claimWithSismo(bytes memory response) public {
    AuthRequest[] memory auths = new AuthRequest[](1);
    auths[0] = buildAuth({authType: AuthType.EVM_ACCOUNT});

    ClaimRequest[] memory claims = new ClaimRequest[](1);
    claims[0] = buildClaim({
      groupId: DEANO_ANNOTATORS_GROUP_ID,
      isSelectableByUser: true,
      isOptional: false
    });

    SismoConnectVerifiedResult memory result = verify({
      responseBytes: response,
      auths: auths,
      claims: claims,
      signature: buildSignature({message: abi.encode(msg.sender)})
    });

    uint256 vaultId = result.getUserId(AuthType.EVM_ACCOUNT);

    // we check if the user has claimed
    uint lastClaimed = claimed[vaultId];
    if (lastClaimed + allowancePeriodInDays > block.timestamp) {
      revert AlreadyClaimed();
    }

    // each vaultId can claim tokens relatively to their its aggregated reputation
    uint256 payoutAmount = _getRewardAmount(result);

    // we update the last claimed timestamp
    claimed[vaultId] = block.timestamp;

    // we mint the tokens to the user
    _mint(msg.sender, payoutAmount);

    emit MoneySent(msg.sender, payoutAmount);
  }
}
