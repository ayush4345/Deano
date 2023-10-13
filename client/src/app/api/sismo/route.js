import { NextResponse } from 'next/server'
// import {readData} from '../../../tableland/connect.js'
import data from './data.json'
export async function GET(request) {

    let annotators = await readData();   

    annotators = annotators.map((annotator) => {
        return {
            name: annotator.name,
            id: annotator.id
        }
    })

    const result = {}

    annotators.forEach((annotator) => {
        result[annotator.name] = annotator.id.toString()
    })

    console.log(result)

    return NextResponse.json(data)

    // return NextResponse.json(result)
}