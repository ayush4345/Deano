"use client"

import {useEffect} from "react"
import {useRouter} from "next/navigation"

export default function VendorProfile() {

    const router = useRouter()

    useEffect(() => {
        router.push('/vendor')
    }, [])

}