import { db } from "./connect";

export default async function CheckUsertype(address) {
    const prefix = "vendors";
    const tableName = `${prefix}_80001_7702`;

    const { results } = await db.prepare(`SELECT * FROM ${tableName} where address= ${address};`).all();
    console.log(results);
    return results
}