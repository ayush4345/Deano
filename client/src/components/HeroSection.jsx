import Link from "next/link"

export default function Hero() {
    return (
        <section className="relative" id="home">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                            </div>
                            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                                <div className="relative pt-36 ml-auto">
                                    <div className="lg:w-2/3 text-center mx-auto">
                                        <h1 className="text-gray-900 dark:text-white font-bold text-4xl md:text-6xl xl:text-7xl">Shaping the world with <span className="text-primary dark:text-white">decentralised annotation.</span></h1>
                                        <p className="mt-8 text-gray-700 dark:text-gray-300">
                                        Deano aims to revolutionize data annotation by introducing a decentralized platform that addresses critical issues in the current landscape.
                                        </p>
                                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                                            <Link
                                                href="/auth/login"
                                                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                                            >
                                                <span className="relative text-base font-semibold text-white"
                                                >Get started</span
                                                >
                                            </Link>
                                            <Link
                                                href="#"
                                                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                                            >
                                                <span
                                                    className="relative text-base font-semibold text-primary dark:text-white"
                                                >Learn more</span
                                                >
                                            </Link>
                                        </div>
                                        <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between gap-x-4">
                                            <div className="text-left w-fit p-2 rounded-md hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 duration-300 transition-all ease-in-out cursor-pointer">
                                                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Decentralized Annotation</h6>
                                                <p className="mt-2 text-gray-500">Deano's decentralized ecosystem allows vendors to confidently post data annotation jobs. Annotators earn DAN tokens for accurate labeling, benefiting both parties.</p>
                                            </div>
                                            <div className="text-left w-fit p-2 rounded-md hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 duration-300 transition-all ease-in-out cursor-pointer">
                                                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Incentivized Annotation</h6>
                                                <p className="mt-2 text-gray-500">Deano uses 'DAN' tokens acquired from Uniswap by vendors for job listings. Annotators earn rewards in DAN tokens, redeemable through weekly payouts.</p>
                                            </div>
                                            <div className="text-left w-fit p-2 rounded-md hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 duration-300 transition-all ease-in-out cursor-pointer">
                                                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Secure Data Management</h6>
                                                <p className="mt-2 text-gray-500">Data management involves Tableland for vendor job listings and IPFS service web3.storage for secure dataset storage.</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
                                        <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                            <img src="./images/clients/microsoft.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
                                        </div>
                                        <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                            <img src="./images/clients/airbnb.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
                                        </div>
                                        <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                                            <img src="./images/clients/google.svg" className="h-9 w-auto m-auto" loading="lazy" alt="client logo" width="" height="" />
                                        </div>
                                        <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                            <img src="./images/clients/ge.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
                                        </div>
                                        <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                                            <img src="./images/clients/netflix.svg" className="h-8 w-auto m-auto" loading="lazy" alt="client logo" width="" height="" />
                                        </div>
                                        <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                            <img src="./images/clients/google-cloud.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </section>
                    )                
}

