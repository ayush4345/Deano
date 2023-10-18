import { db } from '../tableland/connect.js'
export const healthCheck = async () => {
    const tableName = "healthbot_11155111_1"; // Our pre-defined health check table
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
}


export const insertData = async () => {
    // const prefix = "reputations_80001_7724";
    const tableName = `reputations_80001_7724`;
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

    const tableName = `results_test2_80001_7876`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE job_id = '${job_id}';`).all();

    console.log(results);
    return results

}

export const updateJobStatus = async (job_id, status) => {

    const tableName = `jobs_80001_7842`;
    const { meta: update } = await db
        .prepare(`UPDATE ${tableName} SET status = '${status}' WHERE job_id = '${job_id}';`)
        .run();
    console.log(update.txn.transactionHash); // e.g., my_sdk_table_80001_311
    waitForTransaction(update)

    if(status == "pending"){
        computeJobResults(job_id)
    }

    return update.txn.transactionHash
}


const insertResults = async (results, job_id) => {

    const tableName = `results_test2_80001_7876`;

    const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} (job_id,  results) VALUES (?, ?);`)
        .bind(job_id, results)
        .run();
    console.log(insert.txn.transactionHash); // e.g., my_sdk_table_80001_311
    waitForTransaction(insert)
    return insert.txn.transactionHash

}

export const insertAnnotator = async (annotator_address) => {
    const tableName = `reputations_80001_7880`;
    const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} (annotator_address,  reputation) VALUES (?, ?);`)
        .bind(annotator_address, 0)
        .run();

    console.log(insert.txn.transactionHash); // e.g., my_sdk_table_80001_311
    waitForTransaction(insert)
    return insert.txn.transactionHash
}



async function updateReputations(updates, pending_jobs) {
    const tableName = `reputations_80001_7880`;
    //construct a batched update query

    //add the delta to the old reputation

    const queries = pending_jobs.map((job, index) => {
        const { annotator_address } = job;
        const delta = updates[index];
        console.log(`Updating ${annotator_address} by ${delta} points`);
        return db.prepare(`UPDATE ${tableName} SET reputation = reputation + ${delta} WHERE annotator_address = '${annotator_address}';`)
    })

    const res = await db.batch(queries);
    console.log(res); // e.g., my_sdk_table_80001_311

}


export const computeJobResults = async (job_id) => {


    //TODO: Get the pending_jobs

    //dummy responses
    const pending_jobs = [
        {
            annotator_address: "0x123",
            response: [1, 1, 2],
        },

        {
            annotator_address: "0x123",
            response: [2, 2, 1],
        },

        {
            annotator_address: "0x123",
            response: [3, 3, 1],
        },

        {
            annotator_address: "0x123",
            response: [4, 4, 2],
        },

        {
            annotator_address: "0x123",
            response: [5, 5, 3],
        },
    ]

    const responses = pending_jobs.map((job) => job.response);


    //for each index go trough each response and count the majority
    //if there is a tie then we have to do something else
    //if there is no majority then we have to do something else

    const results = responses[0].map((_, colIndex) => responses.map(row => row[colIndex]));

    const answers = results

    //find the value that occurs the most in each row
    const majority = answers.map((row) => {
        return row.reduce((a, b, i, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), null);
    })

    //update reputations for annotators whose answers is in the majority
    const updates = {};

    responses.map((row, index) => {
        let correctCount = 0;
        row.map((answer, i) => {
            if (answer == majority[i]) {
                //update reputation
                correctCount += 1
            }
        })

        updates[index] = correctCount / row.length;

    })

    //convert floats to ints
    Object.keys(updates).map((key) => {
        updates[key] = Math.round(updates[key] * 100);
    })


    updateReputations(updates, pending_jobs)


    // const res = await insertResults( JSON.stringify(majority), job_id);
    // return res;
    return updates;

}


