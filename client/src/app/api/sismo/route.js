import { NextResponse } from 'next/server'
// import {readData} from '../../../tableland/connect.js'
import data from './data.json'
import { getAnnotators } from '../../../tableland/db';
export async function GET(request) {

    let annotators = await getAnnotators();   

    //convert the reputation to string
    annotators = annotators.map((annotator) => {
        return {
            name: annotator.address,
            id: annotator.reputation ? annotator.reputation.toString() : 0
        }
    })

    const result = {}

    annotators.forEach((annotator) => {
        result[annotator.name] = annotator.id.toString()
    })

    console.log(result)

    return NextResponse.json(result)

    // return NextResponse.json(result)
}