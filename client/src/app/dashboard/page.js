"use client"

import { insertData } from "../../tableland/connect"

export default function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={() => { insertData() }}>Insert</button>
        </>
    )
}