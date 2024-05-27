'use client'
import {z} from "zod";
import {ViewersTaskSchema} from "@entities/task/task.contracts"

export async function onSubmit(values: z.infer<typeof ViewersTaskSchema>) {
    console.log('submitted')
    const [hours, minutes] = values.duration.split(':').map(num => parseInt(num, 10))
    values.duration = hours * 60 + minutes
    console.log(values.duration)
    if (values.timing) {
        const sortedTimings = values.timing.map(obj => [obj.time, obj.count]).sort((a, b) => a[0] - b[0])
        values.properties = sortedTimings

    } else {
        values.properties = null
    }
    delete values.timingsCount
    const combinedValues = {...values}
    console.log(combinedValues)
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/tasks/add`, {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(values)
    })
    console.log(response)
}