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
const provider = getDefaultProvider(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`);
const signer = wallet.connect(provider);
// Connect to the database
export const db = new Database({ signer });

export const healthCheck = async () => {
    const tableName = "healthbot_80001_1"; // Our pre-defined health check table
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
    return results;
}

