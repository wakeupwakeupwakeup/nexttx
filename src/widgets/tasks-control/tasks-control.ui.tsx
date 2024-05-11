import React from "react";
import reqWithCredentials from "@/shared/lib/axios/interceptors";
import {TTasksArray} from "@entities/task/types";
import TasksTabs from "@widgets/tasks-control/ui/tasks-tabs.ui";
import {redirect} from "next/navigation";
import TasksTable from "@widgets/tasks-table/tasks-table.ui";


async function getActiveTasks(): Promise<TTasksArray> {
    return await reqWithCredentials.get(`${process.env.NEXT_PUBLIC_API_HOST}/tasks/active`)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                return res.data
            }
        })
        .catch((err) => {
            console.log(err)
            redirect('/auth')
        })
}

const TasksControl: React.FC = async () => {
    const activeTasksData = await getActiveTasks()

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