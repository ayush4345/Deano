import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

// You can also pull getDefaultProvider from the SDK's 'helpers' module

// const privateKey = process.env.NEXT_PUBLIC_SEPOLIA_WALLET_PRIVATE_KEY;
const privateKey = process.env.NEXT_PUBLIC_POLYGON_WALLET_PRIVATE_KEY;
// const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY;
const polygonProviderURL = `https://polygon-mumbai.g.alchemy.com/v2/${alchemyApiKey}`;

const wallet = new Wallet(privateKey);
// To avoid connecting to the browser wallet (locally, port 8545),
// replace the URL with a provider like Alchemy, Infura, Etherscan, etc.
const provider = getDefaultProvider(polygonProviderURL);
const signer = wallet.connect(provider);
// Connect to the database
export const db = new Database({ signer });

export const healthCheck = async () => {
    const tableName = "healthbot_11155111_1"; // Our pre-defined health check table
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
}

export const createTable = async (prefix) => {
    // const prefix = "my_sdk_table";

    const { meta: create } = await db
        .prepare(`CREATE TABLE ${prefix} (id integer primary key, name text);`)
        .run();

    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    console.log(create.txn.name); // e.g., my_sdk_table_11155111_119
}









export const insertData = async () => {
    // const prefix = "reputations_80001_7724";
    const tableName = `reputations_80001_7724`;
    // const tableName = `my_sdk_table_80001_7733`;

    // const { meta: insert } = await db
    //     .prepare(`INSERT INTO ${tableName} (address , score) VALUES (?, ?);`)
    //     .bind('0x3151D7f15e6cdfEeeA36D0dE4F6Da118f7A757e7' , 20)
    //     .run();
    // const { meta: insert } = await db
    //     .prepare(`INSERT INTO ${tableName} (id , name) VALUES (?, ?);`)
    //     .bind(1 , 'test')
    //     .run();
    const { meta: insert } = await db
        .prepare(`INSERT INTO test_80001_7735 (id ) VALUES (?);`)
        .bind(1)
        .run();
        
    console.log(insert.txn.transactionHash); // e.g., my_sdk_table_80001_311
    const res = await insert.txn.wait();
    console.log(res);
}

export const readData = async () => {
    // const prefix = "my_sdk_table";
    // const tableName = `reputations_80001_7724`;
    const tableName = `my_sdk_table_80001_7733`;

    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
    return results
}
