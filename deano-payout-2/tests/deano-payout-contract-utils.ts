import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  MoneyReceived,
  MoneySent,
  Transfer
} from "../generated/DeanoPayoutContract/DeanoPayoutContract"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createMoneyReceivedEvent(
  _from: Address,
  _amount: BigInt
): MoneyReceived {
  let moneyReceivedEvent = changetype<MoneyReceived>(newMockEvent())

  moneyReceivedEvent.parameters = new Array()

  moneyReceivedEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  moneyReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return moneyReceivedEvent
}

export function createMoneySentEvent(_to: Address, _amount: BigInt): MoneySent {
  let moneySentEvent = changetype<MoneySent>(newMockEvent())

  moneySentEvent.parameters = new Array()

  moneySentEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  moneySentEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return moneySentEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
