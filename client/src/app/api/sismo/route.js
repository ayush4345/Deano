import { NextResponse } from 'next/server'
import data from './data.json'
export async function GET(request) {

    let followers = data;
    console.log(followers);

    //construct a json response with this format
    // {
    //     "name" : "id"
    // }

    followers = data.map((follower) => {
        return {
            name: follower.login,
            id: follower.id
        }
    })

    const result = {}

    followers.forEach((follower) => {
        result[follower.name] = follower.id
    })

    return NextResponse.json(result)
}