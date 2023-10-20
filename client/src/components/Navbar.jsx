import Link from "next/link"
import { useEffect, useState } from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "/src/components/ui/hover-card"
import { useRouter } from "next/navigation"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from "wagmi"
import { useSelector, useDispatch } from 'react-redux'
import { BellIcon } from "@radix-ui/react-icons"
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { fetchNotifications } from "../utils/notifications"
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import Notification from "./Notification"
import CheckIfUser from "../utils/checkIfUser"

export default function Navbar() {

    const router = useRouter()
    const userType = useSelector((state) => state.user.userType)

    const { ready, authenticated, user, login, logout, signMessage } = usePrivy();
    const { wallets } = useWallets();
    const [signer, setSigner] = useState(null);
    const [loggingOut, setLoggingOut] = useState(false); // Add this line

    const { address } = useAccount()

    const [notifications, setNotifications] = useState([]);

    async function getNotifications(account) {
        try {
            const data = await fetchNotifications(account)
            console.log('notifications', data)
            setNotifications(data)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {

        if (ready && wallets.length > 0) {
            getNotifications(wallets[0].address)
            CheckIfUser(wallets[0].address)
        }

    }, [ready, wallets])

    useEffect(() => {
        const getSigner = async () => {
            const embeddedWallet =
                wallets.find((wallet) => wallet.walletClientType === "privy") ||
                wallets[0];
            if (embeddedWallet) {
                const provider = await embeddedWallet.getEthersProvider();
                const signer = provider.getSigner();
                signer.signMessage = async (message) => {
                    const uiConfig = {
                        title: "Enable Secure Messaging with XMTP",
                        description:
                            "What is XMTP? XMTP provides apps and websites with private, secure, and encrypted messaging without your email or phone number. To turn on secure messaging for this app, tap the 'Enable XMTP' button.",
                        buttonText: "Enable XMTP",
                    };

                    const signature = await signMessage(message, uiConfig);

                    return signature;
                };
                setSigner(signer);
            }
        };

        if (wallets.length > 0) {
            getSigner();
        }
    }, [wallets]);

    const handleLogout = async () => {
        setLoggingOut(true); // Set loggingOut to true when logout begins
        await logout(); // Wait for logout to complete
        setLoggingOut(false); // Set loggingOut to false when logout ends
    };

    return (
        <header>
            <nav className="z-10 w-full ">
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="flex items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
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
                                lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:visible lg:opacity-100 lg:border-none
                                peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none 
                                dark:shadow-none dark:bg-gray-800 dark:border-gray-700">

                            <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                                <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                                    <li className="flex items-center md:px-4 transition hover:text-primary">
                                        <Link href="/redeem" className="flex items-center md:px-4 transition hover:text-primary">
                                            <span>Redeem</span>
                                        </Link>
                                    </li>
                                    <li className="flex items-center md:px-4 transition hover:text-primary">
                                        <Link href="/vendor" className="block md:px-4 transition hover:text-primary">
                                            <span>Vendor Dashboard</span>
                                        </Link>
                                    </li>

                                    <li className="flex items-center md:px-4 transition hover:text-primary">
                                        <Link href="/chat" className="block md:px-4 transition hover:text-primary">
                                        Chat (powered by XMTP) <span className="text-xs text-red-500">BETA</span>
                                        </Link>
                                    </li>
                                    <li className="flex items-center md:px-4 transition hover:text-primary">
                                        <AlertDialog.Root>
                                            <AlertDialog.Trigger asChild>
                                                <button>
                                                    <BellIcon />
                                                </button>
                                            </AlertDialog.Trigger>
                                            <AlertDialog.Portal>
                                                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
                                                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed z-20 top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                                    <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                                        {`Notifications (${notifications.length})`}
                                                    </AlertDialog.Title>
                                                    <AlertDialog.Description className=" max-h-[68vh] overflow-y-scroll mt-4 mb-5 text-[15px] leading-normal">
                                                        {notifications.map((n, i) => {
                                                            // Create a notification row where icon is an image.
                                                            return <Notification key={i} notification={n} />
                                                        })}
                                                    </AlertDialog.Description>
                                                    <div className="flex justify-end gap-[25px]">
                                                        <AlertDialog.Cancel asChild>
                                                            <button className=" bg-red-400 hover:bg-red-600 text-white inline-flex h-[35px] items-center justify-center rounded-[8px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                                                Close
                                                            </button>
                                                        </AlertDialog.Cancel>
                                                    </div>
                                                </AlertDialog.Content>
                                            </AlertDialog.Portal>
                                        </AlertDialog.Root>
                                    </li>

                                    {/* <li className="flex items-center md:px-4 transition hover:text-primary">
                                        <button id="sdk-trigger-id"><BellIcon /></button>
                                    </li> */}
                                    <li className="flex items-center md:px-4 transition hover:text-primary">
                                        {ready
                                            ? (authenticated
                                                ? <button className=" bg-orange-600 text-white p-3 px-3 rounded-xl font-semibold" onClick={() => handleLogout()}>{loggingOut ? "logging out..." : "logout privy"}</button>
                                                : <button className=" bg-orange-600 text-white p-3 px-3 rounded-xl font-semibold" onClick={login}>login privy</button>
                                            )
                                            : <button className=" bg-orange-400 text-white p-3 px-3 rounded-xl font-semibold" onClick={login} disabled>login privy</button>
                                        }
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 lg:mt-0 flex gap-4">
                                <ConnectButton />
                                {address
                                    ? <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <img
                                                alt="user"
                                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`}
                                                className=" w-10 h-10 rounded-full"
                                            />
                                        </HoverCardTrigger>
                                        <HoverCardContent className=" w-fit p-2 rounded-lg">
                                            <button onClick={() => router.push("/profile/annotator")} className="hover:bg-slate-200 p-3 rounded-lg">
                                                Profile
                                            </button>
                                        </HoverCardContent>
                                    </HoverCard>
                                    : <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}