import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  job_id: z.string(),
  name: z.string(),
  vendor_address: z.string(),
  status: z.string(),
  bounty: z.number(),
  cid: z.string(),
})

export type Task = z.infer<typeof taskSchema>
