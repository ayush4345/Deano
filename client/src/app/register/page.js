'use client'

import { useSelector, useDispatch } from 'react-redux'
import { setUserType, setUserAddress, setUserName } from '../../utils/userSlice'
import { useEffect, useState } from 'react'
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from 'next/navigation'

import { db } from '../../tableland/connect'

const types = ["Vendor", "Annotator"]

export default function register() {

    const dispatch = useDispatch()
    const router = useRouter()
    // const [type, setType] = useState("")
    const [address, setAddress] = useState("")
    const [userTypeSelected, setUserTypeSelected] = useState(false)

    let name = useSelector((state) => state.user.name)
    let userType = useSelector((state) => state.user.userType)

    const { wallets } = useWallets();
    const { ready, authenticated, user, login, logout, signMessage } = usePrivy();


    const userTypeHandler = (value) => {
        dispatch(setUserType(value))
        setUserTypeSelected(true)
    }

    const userAddressHandler = (value) => {
        dispatch(setUserAddress(value))
    }

    useEffect(() => {
        if (wallets && ready && authenticated) {
            setAddress(wallets[0].address)
            userAddressHandler(wallets[0].address)
        }

    }, [wallets])

    console.log(address)

    const submitHandler = async () => {

        try {
            if (userType == "Vendor") {
                console.log("inserting to tableland")
                const tableName = "vendors_final_80001_7888";

                const { meta: insert } = await db
                    .prepare(`INSERT INTO ${tableName} (name,address) VALUES (?, ?);`)
                    .bind(name, address)
                    .run();

                console.log(insert)
                console.log(insert.txn.transactionHash);
                const res = await insert.txn.wait();
                console.log(res);

                router.push("/vendor")
            } else if (userType == "Annotator") {
                console.log("inserting to tableland")

                const tableName = "annotators_80001_7704";

                const { meta: insert } = await db
                    .prepare(`INSERT INTO ${tableName} (name,address) VALUES (?, ?);`)
                    .bind(name, address)
                    .run();

                console.log(insert)
                console.log(insert.txn.transactionHash);
                const res = await insert.txn.wait();
                console.log(res);

                router.push("/tasks")
            }

        } catch (error) {
            console.log(error)
        }
        console.log(name, userType, address)

    }

    return (
        <main className='h-screen flex flex-col justify-center items-center'>
            <div className='flex gap-2 mb-24 items-center justify-center'>
                <span className={` h-[2px] w-5 bg-black`}></span>
                <span onClick={() => setUserTypeSelected(false)} className=' h-7 w-7 rounded-full bg-black text-white flex items-center justify-center'>1</span>
                <span className={` h-[2px] w-72 ${userTypeSelected ? "bg-black" : "bg-gray-300"} transition-colors ease-out`}></span>
                <span className=' h-7 w-7 rounded-full bg-black text-white flex items-center justify-center'>2</span>
                <span className={`h-[2px] w-5 ${userTypeSelected ? "bg-black" : "bg-gray-300"} transition-colors ease-out`}></span>
            </div>
            <div>
                {!userTypeSelected && (
                    <section className='flex flex-col items-center gap-7'>
                        <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Type of User</div>
                        <div className='flex flex-col sm:flex-row gap-5'>
                            {types.map((data, index) => {
                                return (
                                    <button key={index} onClick={() => userTypeHandler(data)} className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${userType === data ? "bg-gray-300 border-2 border-black" : "bg-white"}`}>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data}</h5>
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                )}
                {userTypeSelected && (
                    <section className='flex flex-col items-center gap-7'>
                        <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enter your name</div>
                        <div className='flex gap-5 flex-col sm:flex-row'>
                            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' onChange={(e) => dispatch(setUserName(e.target.value))} type="text" placeholder='micheal' />
                        </div>
                        <button onClick={() => submitHandler()} className='px-5 py-3 bg-black font-semibold text-white rounded-lg shadow-md hover:bg-gray-900' >
                            Submit!
                        </button>
                    </section>
                )
                }
            </div>
        </main>
    )
}