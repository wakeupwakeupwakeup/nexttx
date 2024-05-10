import {z} from "zod";

export const ViewersTaskSchema = z.object({
    channel: z.string().min(2, {message: "Название канала должно быть длинной не менее 2-х символов"}).max(30),
    viewers: z.number().min(1),
    properties: z.array(z.array(z.number()).max(2)).optional(),
    duration: z.string({message: "Обязательно для заполнения"}),
    timingsCount: z.number().optional(),
    timing: z.array(z.object({
        time: z.number(),
        count: z.number(),
    })).optional()
})
