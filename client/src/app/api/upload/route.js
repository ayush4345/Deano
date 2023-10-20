import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { storeFiles } from '@/storage/config'

export async function POST(req) {

    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());

    if (formDataEntryValues.length === 0) {
        return NextResponse.json({ success: false })
    }

    const files = []
    for (const formDataEntryValue of formDataEntryValues) {
        if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
            const file = formDataEntryValue;
            console.log(file);
            files.push(file);
        }
    }

    const cid = await storeFiles(files)


    // Store the file in web3.storage
    return NextResponse.json({
        success: true,
        cid : cid,
        // cid: "bafybeihi4eb6t32szzhxcp7gxrspwcpviktqy7o7s2qagfnqigd7moicri"
    })
}