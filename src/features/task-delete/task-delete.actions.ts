import {revalidateTag} from "next/cache";

export async function deleteTask(taskId: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/tasks/delete`, {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(taskId)
    })
    console.log(response.json())
    revalidateTag('activeTasks')
}