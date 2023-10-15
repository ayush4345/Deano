'use client'
import { db, healthCheck, createTable, insertData, readData } from '../../tableland/connect.js'

export default function Faucet() {

    return (
        <h2 className='text-center'>
            <button onClick={healthCheck} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Connect to Tableland
            </button>

            <button onClick={() => createTable("water")} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                Create Table
            </button>

            <button onClick={insertData} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                Insert Data
            </button>

            <button onClick={readData} className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
                Read Data
            </button>




        </h2>
    )


}
