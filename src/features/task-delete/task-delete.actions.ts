import reqWithCredentials from "@/shared/lib/axios/interceptors";

export async function deleteTask(taskId: number) {
    return reqWithCredentials.delete(`${process.env.NEXT_PUBLIC_API_HOST}/tasks/delete`, {
        params: {
            id: taskId,
            type: "stream"
        }
    })
        .then((res) => {
            console.log(res)
            return Promise.resolve()
        })
        .catch((err) => {
            console.log(err)
        })
}