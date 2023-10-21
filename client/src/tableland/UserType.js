import { db } from "./connect";

export async function CheckIfVendor(address) {

    const tableName = `vendors_final_80001_7888`;

    const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
    console.log(results);
    const filteredResult = results.filter(item => item.address === address)
    if (filteredResult.length > 0) {
       
    }
    // return filteredResult
}

export async function CheckIfAnnotator(address) {

    const tableName = `annotators_80001_7704`;

    const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
    console.log(results);
    const filteredResult = results.filter(item => item.address === address)
    if (filteredResult.length > 0) {
        
    }
    // return filteredResult
}