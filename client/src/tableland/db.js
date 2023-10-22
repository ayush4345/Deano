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

export const getAnnotator = async (annotator_address) => {
    // const prefix = "my_sdk_table";
    // const tableName = `reputations_80001_7724`;
    const tableName = `annotators_80001_7704`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE address = ${annotator_address}`).all();
    console.log(results);
    return results
}

async function waitForTransaction(insert) {
    const res = await insert.txn.wait();
    if (res.error) console.log(res.error);
    console.log(res);
}


export const createJob = async (job) => {
    const tableName = "jobs_final2_80001_7898";
    const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} (name, vendor_address, job_id,  cid, status , bounty) VALUES (?, ?, ?, ?, ?, ?);`)
        .bind(job.name, job.vendor_address, job.job_id, job.cid, job.status, job.bounty)
        .run();
    console.log(insert.txn.transactionHash); // e.g., my_sdk_table_80001_311
    waitForTransaction(insert)
    return insert.txn.transactionHash
}


export const getAllJobs = async () => {
    const tableName = `jobs_final2_80001_7898`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
    return results

}

export const getVendorJobs = async (vendor_address) => {
    const tableName = `jobs_final2_80001_7898`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE vendor_address = '${vendor_address}';`).all();
    console.log(results);
    return results

}

export const getJob = async (job_id) => {
    const tableName = `jobs_final2_80001_7898`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE job_id = '${job_id}';`).all();
    console.log(results);
    return results
}

export const getJobResults = async () => {

    const { results } = await db.prepare(`SELECT * FROM results_final_80001_7932 LIMIT 100;`).all();
    console.log(results);
    return results

}

export const updateJobStatus = async (job_id, status) => {

    const tableName = `jobs_final2_80001_7898`;
    const { meta: update } = await db
        .prepare(`UPDATE ${tableName} SET status = '${status}' WHERE job_id = '${job_id}';`)
        .run();
    console.log(update.txn.transactionHash); // e.g., my_sdk_table_80001_311
    waitForTransaction(update)

    // if (status == "pending") {
        computeJobResults(job_id)
    // }

    return update.txn.transactionHash
}


const insertResults = async (results, job_id) => {

    const tableName = `results_final_80001_7932`;

    const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} (job_id,  results) VALUES (?, ?);`)
        .bind(job_id, results)
        .run();
    console.log(insert.txn.transactionHash);
    waitForTransaction(insert)

    const res = await updateJobStatus(job_id, "completed")

    console.log(res.txn.transactionHash);

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
    const tableName = `annotators_80001_7704`;
    //construct a batched update query

    //add the delta to the old reputation

    const queries = pending_jobs.map((job, index) => {
        const { annotator_address } = job;
        const delta = updates[index];
        console.log(`Updating ${annotator_address} by ${delta} points`);

        return db.prepare(`UPDATE ${tableName} SET reputation = reputation + ${delta} WHERE address = '${annotator_address}';`)
    })

    const res = await db.batch(queries);
    console.log(res); // e.g., my_sdk_table_80001_311

}


export const computeJobResults = async (job_id) => {

    const tableName = `answers_final_80001_7894`;

    let { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE job_id = '${job_id}';`).all();

    results = results.filter((result) => result.annotator_id !== "" && result.labels.length > 0)
    // console.log(results[0].labels);

    const pending_jobs = results.map((result) => {
        return {
            annotator_address: result.annotator_id,
            response: result.labels,
        }
    })

    // console.log(pending_jobs);

    const responses = pending_jobs.map((job) => job.response);
    console.log(responses);

    //find the value occuring the most in each column
    const majority = [];
    for (let i = 0; i < responses[0].length; i++) {
        const column = responses.map((row) => row[i]);
        const counts = {};
        column.forEach((value) => {
            if (value in counts) {
                counts[value] += 1;
            } else {
                counts[value] = 1;
            }
        });
        let max = 0;
        let max_value = null;
        for (const [value, count] of Object.entries(counts)) {
            if (count > max) {
                max = count;
                max_value = value;
            }
        }
        majority.push(max_value);
    }

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
        updates[key] = Math.round(updates[key] * 10);
    })

    console.log(updates)


    updateReputations(updates, pending_jobs)

    const res = await insertResults(JSON.stringify(majority), job_id);
    return res;

}


