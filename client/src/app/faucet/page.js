'use client'
import { useAccount, useBalance, useContractRead, useContractWrite, usePrepareContractWrite, useToken } from "wagmi"
import { useState } from 'react'
export default function Faucet() {

    //buy tokens
    //check how to give popup for metamask
    //connect to the token contract and call trasfer(ammont) 
    //show tokens on success
    const contractAddress = "0xecb504d39723b0be0e3a9aa33d646642d1051ee1";


    //redeem tokens
    //get user type from roles in tableland
    const [userType, setUserType] = useState('annotator')
    //if user type is vendor not allowed to redeem tokens
    //if user type is a annotator then 
    //get the reputation from tableland table
    if (userType === 'annotator') {
        //get the reputation from tableland table
        const reputation = 10;
        const amountToGive = reputation * 10;

        const { config } = usePrepareContractWrite({
            address: contractAddress,
            abi: tokenABI,
            functionName: 'feed',
        })

        const { data, write } = useContractWrite(config)

    }

    //call the trasfer(amount) function of the token contract
    //show tokens balance on success

    //check balance
    //get the balance from the token contract

    const { address } = useAccount();
    const SETHTokenAdd = '0x7daf26D64a62e2e1dB838C84bCAc5bdDb3b5D926'

    const { data } = useToken({
        address: SETHTokenAdd,
        chainId: 1,
    })


    const res = useBalance({
        address: address,
        token: SETHTokenAdd,
    })
    // console.log(res.data.formatted)

    const tokenABI = require('../../abi/wagmigotchi.json')
    // console.log(tokenABI)

    const read = useContractRead({
        address: contractAddress,
        abi: tokenABI,
        functionName: "getHunger"
    },)

    if (read.isLoading) return <div>Loading...</div>
    if (read.isError) return <div>Error</div>
    console.log(read.data)

    // console.log()

    return (
        <div>

            <h1>Faucet</h1>

            <div className="balance">
                You have {res.data.formatted} {data.symbol} tokens
            </div>

            <div className="redeem-tokens">
                {
                    userType === 'annotator' ? (
                        <div>

                        </div>
                    ) : (
                        <div>
                            <h3>Only annotators can redeem tokens</h3>
                        </div>
                    )
                }
            </div>
            <div className="buy-tokens">

                <label for="token">Buy tokens</label>
                <input type="range" name="token" id="token" />

                <button>Buy</button>

            </div>

        </div >
    )
}
