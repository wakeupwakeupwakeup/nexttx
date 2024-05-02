import {z} from "zod";

export const ViewersTaskSchema = z.object({
    channel: z.string().min(2).max(30),
    count: z.number().min(1),
    complete_datetime: z.string().time()
})
