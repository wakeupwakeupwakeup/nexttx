import {z} from "zod";
import {ViewersTaskSchema} from "@entities/task/task.contracts";
import reqWithCredentials from "@/shared/lib/axios/interceptors";

export async function onSubmit(values: z.infer<typeof ViewersTaskSchema>) {
    console.log('submitted')
    const [hours, minutes] = values.duration.split(':').map(num => parseInt(num, 10))
    values.duration = hours * 60 + minutes * 60
    if (values.timing) {
        const sortedTimings = values.timing.map(obj => [obj.time, obj.count]).sort((a, b) => a[0] - b[0])
        values.properties = sortedTimings

    } else {
        values.properties = null
    }
    const combinedValues = {...values}
    console.log(combinedValues)
    await reqWithCredentials.post(`${process.env.NEXT_PUBLIC_API_HOST}/tasks/stream/create`, combinedValues)
        .then((res) => {
            if (res.status == 200) {
                console.log(res)
                return
            }
        })
        .catch((err) => {
            console.log(err)
        })
}