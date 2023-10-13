'use client'
import { db , healthCheck } from '../../tableland/connect.js'

export default function Faucet() {
    
    return (
        <h2>
            <button onClick={healthCheck}>
                Connect to Tableland
            </button>
        </h2>
    )


}
