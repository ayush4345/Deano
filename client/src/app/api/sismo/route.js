import { NextResponse } from 'next/server'

export async function GET(request) {

    const followers = await fetch(" https://api.github.com/users/Shubham-Rasal/followers")
    const followersJson = await followers.json()
    console.log(followersJson)
    return NextResponse.json(followersJson)
}