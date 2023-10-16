import {db} from '../tableland/connect.js'
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

async function waitForTransaction(insert) {
    const res = await insert.txn.wait();
    if (res.error) console.log(res.error);
}


export const createJob = async (job) => {
    const tableName = "jobs_11155111_137";
    const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} (vendor_address, job_id, status , cid, bounty, type) VALUES (?, ?, ?, ?, ?, ?);`)
        .bind(job.vendor_address, job.job_id, job.status, job.cid, job.bounty, job.type)
        .run();
    console.log(insert.txn.transactionHash); // e.g., my_sdk_table_80001_311
    waitForTransaction(insert)
    return insert.txn.transactionHash
}


export const getAllJobs = async () => {
    const tableName = `jobs_11155111_137`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
    return results

}

export const getVendorJobs = async (vendor_address) => {
    const tableName = `jobs_11155111_137`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE vendor_address = '${vendor_address}';`).all();
    console.log(results);
    return results

}

export const getJob = async (job_id) => {
    const tableName = `jobs_11155111_137`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE job_id = '${job_id}';`).all();
    console.log(results);
    return results
}

export const getJobResults = async (job_id) => {

    const tableName = `results_11155111_137`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE job_id = '${job_id}';`).all();

}