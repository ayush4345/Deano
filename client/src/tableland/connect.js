import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

// You can also pull getDefaultProvider from the SDK's 'helpers' module

const privateKey = process.env.NEXT_PUBLIC_SEPOLIA_WALLET_PRIVATE_KEY;
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const wallet = new Wallet(privateKey);
// To avoid connecting to the browser wallet (locally, port 8545),
// replace the URL with a provider like Alchemy, Infura, Etherscan, etc.
const provider = getDefaultProvider(`https://polygon-mumbai.g.alchemy.com/v2/${alchemyApiKey}`);
const signer = wallet.connect(provider);
// Connect to the database
export const db = new Database({ signer });

export const healthCheck = async () => {
    const tableName = "healthbot_11155111_1"; // Our pre-defined health check table
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
}

export const createTable = async () => {
    const prefix = "my_sdk_table";

    const { meta: create } = await db
        .prepare(`CREATE TABLE ${prefix} (id integer primary key, name text);`)
        .run();

    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    console.log(create.txn.name); // e.g., my_sdk_table_11155111_119
}


export const insertData = async () => {
    // const prefix = "my_sdk_table";
    // const tableName = `${prefix}_11155111_119`;

    const prefix = "vendors";
    const tableName = "vendors_80001_7702";

    // const { meta: insert } = await db
    //     .prepare(`INSERT INTO ${tableName} (id , name) VALUES (?, ?);`)
    //     .bind(2 , 'of')
    //     .run();

    const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} (name,address,jobs_created) VALUES (?, ?, ?);`)
        .bind("trial", "0x2D449c535E4B2e07Bc311fbe1c14bf17fEC16AAb", "hello")
        .run();

    console.log(insert.txn.transactionHash); // e.g., my_sdk_table_80001_311
    const res = await insert.txn.wait();
    console.log(res);
}

export const readData = async () => {
    const prefix = "my_sdk_table";
    const tableName = `${prefix}_11155111_119`;

    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
    return results
}
