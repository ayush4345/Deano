import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
      //todo 
    //filter jobs by vendor address
    const vendor_address = params.address
    const vendor_details = {
        name: 'test',
        address: vendor_address,
    }

    return NextResponse.json(vendor_details)
}
