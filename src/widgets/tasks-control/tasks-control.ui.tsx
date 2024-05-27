import React from "react";
import {TTasksArray} from "@entities/task/types";
import TasksTabs from "@widgets/tasks-control/ui/tasks-tabs.ui";
import TasksTable from "@widgets/tasks-table/tasks-table.ui";
import {cookies} from "next/headers";


async function getActiveTasks(): Promise<TTasksArray> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/tasks/active`, {
        credentials: 'same-origin',
        headers: new Headers({
            'Cookie': `access_token=${cookies().get('access_token')?.value}`,
        }),
        cache: 'no-cache',
        next: {
            tags: ['activeTasks']
        }
    })
    return response.clone().json()
}

const TasksControl: React.FC = async () => {
    const activeTasksData = await getActiveTasks()
    console.log(activeTasksData)

    return (
        <div className={"flex flex-col p-8 w-full bg-twitch-gray-300 rounded"}>
            <div className={"flex justify-between"}>
                <h1>Задания</h1>
                <TasksTabs />
            </div>
            {
                activeTasksData.count > 0 ? (<TasksTable activeTasks={activeTasksData}/>) : (<div>Нет активных тасков</div>)
            }
        </div>
    )
}

export default TasksControl