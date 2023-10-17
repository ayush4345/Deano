import { getVendorJobs } from '../../../../../tableland/db.js'

export async function GET(request, { params }) {
    //todo 
    //filter jobs by vendor address
    const vendor_address = params.address
    const jobs = await getVendorJobs(vendor_address);
    console.log(jobs);
    return NextResponse.json(jobs)
}
