"use client"

import { useAccount } from "wagmi"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function AnnotatorProfile() {

    const { address } = useAccount()

    return (
        <div class="w-full px-6 py-6 mx-auto drop-zone loopple-min-height-78vh text-slate-500"><div class="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
            <div class="flex flex-wrap -mx-3">
                <div class="flex-none w-auto max-w-full px-3">
                    <div class="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`} alt="profile_image" class="w-20 shadow-soft-sm rounded-xl" />
                    </div>
                </div>
                <div class="flex-none w-auto max-w-full px-3 my-auto">
                    <div class="h-full">
                        <h5 class="mb-1">{address}</h5>
                        <p class="mb-0 font-semibold leading-normal text-sm">Annotator</p>
                    </div>
                </div>
                <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12"></div>
            </div>
        </div><div class="w-full pb-6 mx-auto removable">
                <div class="flex flex-wrap -mx-3 drop-zone">
                    <div class="w-full max-w-full px-3 xl:w-4/12">
                        <div class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                            <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                <h6 class="mb-0">Platform Settings</h6>
                            </div>
                            <div class="flex-auto p-4">
                                <h6 class="font-bold leading-tight uppercase text-xs text-slate-500">Account</h6>
                                <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li class="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="follow" />
                                            <Label htmlFor=" follow" >Enable Push Notification</Label>
                                        </div>
                                    </li>
                                </ul>
                                <h6 class="mt-6 font-bold leading-tight uppercase text-xs text-slate-500">Application</h6>
                                <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li class="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="launches projects" />
                                            <Label htmlFor="launches projects">New launches and projects</Label>
                                        </div>
                                    </li>
                                    <li class="relative block px-0 py-2 bg-white border-0 text-inherit">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="product updates" />
                                            <Label htmlFor="product updates" >Monthly product updates</Label>
                                        </div>
                                    </li>
                                    <li class="relative block px-0 py-2 pb-0 bg-white border-0 rounded-b-lg text-inherit">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="subscribe" />
                                            <Label htmlFor="subscribe" >Subscribe to newsletter</Label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4 draggable" draggable="true">
                        <div class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                            <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                <div class="flex flex-wrap -mx-3">
                                    <div class="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                        <h6 class="mb-0">Profile Information</h6>
                                    </div>
                                    <div class="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                                        <a href="javascript:;" data-target="tooltip_trigger" data-placement="top">
                                            <i class="leading-normal fas fa-user-edit text-sm text-slate-400" aria-hidden="true"></i>
                                        </a>
                                        <div data-target="tooltip" class="px-2 py-1 text-center text-white bg-black rounded-lg text-sm hidden" role="tooltip" data-popper-placement="top" style={{ position: "absolute", inset: "auto auto 0px 0px", margin: "0px", transform: "translate3d(1034px, -698px, 0px)" }}> Edit Profile <div class="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow="" style={{ position: "absolute", left: "0px", transform: "translate3d(0px, 0px, 0px)" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-auto p-4">
                                <p class="leading-normal text-sm">Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).</p>
                                <hr class="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                                <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li class="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                                        <strong class="text-slate-700">Full Name:</strong> &nbsp; Alec M. Thompson
                                    </li>
                                    <li class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                        <strong class="text-slate-700">Mobile:</strong> &nbsp; (44) 123 1234 123
                                    </li>
                                    <li class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                        <strong class="text-slate-700">Email:</strong> &nbsp; alecthompson@mail.com
                                    </li>
                                    <li class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                        <strong class="text-slate-700">Location:</strong> &nbsp; USA
                                    </li>
                                    <li class="relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit">
                                        <strong class="leading-normal text-sm text-slate-700">Social:</strong> &nbsp; <a class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center text-blue-800 align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none" href="javascript:;">
                                            <i class="fab fa-facebook fa-lg" aria-hidden="true"></i>
                                        </a>
                                        <a class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none text-sky-600" href="javascript:;">
                                            <i class="fab fa-twitter fa-lg" aria-hidden="true"></i>
                                        </a>
                                        <a class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none text-sky-900" href="javascript:;">
                                            <i class="fab fa-instagram fa-lg" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4 draggable" draggable="true">
                        <div class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                            <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                <h6 class="mb-0">Previous Annotations Jobs</h6>
                            </div>
                            <div class="flex-auto p-4">
                                <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li class="relative flex items-center px-0 py-2 mb-2 bg-white border-0 rounded-t-lg text-inherit">
                                        <div class="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/kal-visuals-square.jpg" alt="kal" class="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div class="flex flex-col items-start justify-center">
                                            <h6 class="mb-0 leading-normal text-sm">Sophie B.</h6>
                                            <p class="mb-0 leading-tight text-xs">Hi! I need more information..</p>
                                        </div>
                                        <a class="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                    </li>
                                    <li class="relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit">
                                        <div class="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/marie.jpg" alt="kal" class="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div class="flex flex-col items-start justify-center">
                                            <h6 class="mb-0 leading-normal text-sm">Anne Marie</h6>
                                            <p class="mb-0 leading-tight text-xs">Awesome work, can you..</p>
                                        </div>
                                        <a class="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                    </li>
                                    <li class="relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit">
                                        <div class="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/ivana-square.jpg" alt="kal" class="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div class="flex flex-col items-start justify-center">
                                            <h6 class="mb-0 leading-normal text-sm">Ivanna</h6>
                                            <p class="mb-0 leading-tight text-xs">About files I can..</p>
                                        </div>
                                        <a class="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                    </li>
                                    <li class="relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit">
                                        <div class="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/team-4.jpg" alt="kal" class="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div class="flex flex-col items-start justify-center">
                                            <h6 class="mb-0 leading-normal text-sm">Peterson</h6>
                                            <p class="mb-0 leading-tight text-xs">Have a great afternoon..</p>
                                        </div>
                                        <a class="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                    </li>
                                    <li class="relative flex items-center px-0 py-2 bg-white border-0 border-t-0 rounded-b-lg text-inherit">
                                        <div class="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/team-3.jpg" alt="kal" class="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div class="flex flex-col items-start justify-center">
                                            <h6 class="mb-0 leading-normal text-sm">Nick Daniel</h6>
                                            <p class="mb-0 leading-tight text-xs">Hi! I need more information..</p>
                                        </div>
                                        <a class="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}