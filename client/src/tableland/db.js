import { db } from '../tableland/connect.js'
export const healthCheck = async () => {
    const tableName = "healthbot_11155111_1"; // Our pre-defined health check table
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
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

async function waitForTransaction(insert) {
    const res = await insert.txn.wait();
    if (res.error) console.log(res.error);
    console.log(res);
}


export const createJob = async (job) => {
    const tableName = "jobs_80001_7842";
    const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} (vendo_address, job_id,  cid, status , bounty) VALUES (?, ?, ?, ?, ?);`)
        .bind(job.vendor_address, job.job_id, job.cid, job.status, job.bounty)
        .run();
    console.log(insert.txn.transactionHash); // e.g., my_sdk_table_80001_311
    waitForTransaction(insert)
    return insert.txn.transactionHash
}


export const getAllJobs = async () => {
    const tableName = `jobs_80001_7842`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
    return results

}

export const getVendorJobs = async (vendor_address) => {
    const tableName = `jobs_80001_7842`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE vendo_address = '${vendor_address}';`).all();
    console.log(results);
    return results

}

export const getJob = async (job_id) => {
    const tableName = `jobs_80001_7842`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE job_id = '${job_id}';`).all();
    console.log(results);
    return results
}

export const getJobResults = async (job_id) => {

    const tableName = `results_11155111_137`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE job_id = '${job_id}';`).all();

}