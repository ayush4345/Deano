import Link from "next/link"
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import { setUserData } from '/src/utils/userSlice'
// import { supabase } from '/src/utils/supabase'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "/src/components/ui/hover-card"
import { useRouter } from "next/navigation"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from "wagmi"
import XMTPChat from "./XMTP/XMTPChat"

export default function Navbar() {

    // const dispatch = useDispatch()
    // const router = useRouter()

    // const getUserData = async () => {
    //     const { data: { user } } = await supabase.auth.getUser()
    //     dispatch(setUserData(user))
    // }

    // useEffect(() => {
    //     getUserData()
    // }, [])

    // const user = useSelector((state) => state.user.userData)

    // const logoutHandler = async () => {
    //     const { error } = await supabase.auth.signOut()
    //     if (!error) {
    //         router.push("/")
    //     }
    // }

    const { address } = useAccount()

    return (
        <header>
            <nav className="z-10 w-full ">
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
                        <input aria-hidden="true" type="checkbox" name="toggle_nav" id="toggle_nav" className="hidden peer" />
                        <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
                            <Link href="/" aria-label="logo" className="flex space-x-2 items-center">
                                <div aria-hidden="true" className="flex space-x-1">
                                    <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white"></div>
                                    <div className="h-6 w-2 bg-primary"></div>
                                </div>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">Deano</span>
                            </Link>

                            <div className="relative flex items-center lg:hidden max-h-10">
                                <label role="button" for="toggle_nav" aria-label="humburger" id="hamburger" className="relative  p-6 -mr-6">
                                    <div aria-hidden="true" id="line" className="m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                                    <div aria-hidden="true" id="line2" className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                                </label>
                            </div>
                        </div>
                        <div aria-hidden="true" className="fixed z-10 inset-0 h-screen w-screen bg-white/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"></div>
                        <div className="z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                                lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:w-7/12 lg:gap-0 lg:p-0 lg:bg-transparent lg:visible lg:opacity-100 lg:border-none
                                peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none 
                                dark:shadow-none dark:bg-gray-800 dark:border-gray-700">

                            <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                                <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                                    <li>
                                        <Link href="/#features" className="block md:px-4 transition hover:text-primary">
                                            <span>Features</span>
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link href="/dashboard" className="block md:px-4 transition hover:text-primary">
                                            <span>Dashboard</span>
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link href="/vendor" className="block md:px-4 transition hover:text-primary">
                                            <span>Vendor Dashboard</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/chat" className="block md:px-4 transition hover:text-primary">
                                            <span>X</span>
                                        </Link>
                                    </li>

                                    {/* <li>
                                        <Link href="#testimonials" className="block md:px-4 transition hover:text-primary">
                                            <span>Testimonials</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#blog" className="block md:px-4 transition hover:text-primary">
                                            <span>Blog</span>
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>

                            <div className="mt-12 lg:mt-0">
                                {/* {address
                                    ? <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <img
                                                alt="user"
                                                src={`https://api.dicebear.com/5.x/bottts/svg?seed=${address}`}
                                                className=" w-10 h-10 rounded-full"
                                            />
                                        </HoverCardTrigger>
                                        <HoverCardContent className=" w-fit p-2 rounded-lg">
                                            <button onClick={() => logoutHandler()} className="hover:bg-slate-200 p-3 rounded-lg">
                                                Log out
                                            </button>
                                        </HoverCardContent>
                                    </HoverCard>
                                    : <ConnectButton />
                                } */}
                                <ConnectButton />

                                
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}