'use server'

import {ScrollArea} from "@/shared/ui/@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/shared/ui/@/components/ui/table";
import React, {Suspense} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/shared/ui/@/components/ui/dialog";
import reqWithCredentials from "@/shared/lib/axios/interceptors";
import {redirect} from "next/navigation";
import {labelsMap, THistoryTask, TTasksArray} from "@entities/task/types";
import {Skeleton} from "@/shared/ui/@/components/ui/skeleton";


async function getTaskHistory(): Promise<TTasksArray> {
    return await reqWithCredentials.get(`${process.env.NEXT_PUBLIC_API_HOST}/tasks/history`)
        .then((res) => {
            if (res.status === 200) {
                return res.data
            }
        })
        .catch(() => {
            redirect('/auth')
        })
}

const TableSkeleton: React.FC = () => {
    return (
        <div>
            <Skeleton className={"w-max h-max"}/>
        </div>

    )
}


const TasksHistory: React.FC = async () => {
    const tasks = await getTaskHistory()
    const immutatedTasks: THistoryTask[] = tasks.tasks.map(({id, channel, complete_task}) => ({id, channel, complete_task}))
    console.log('TASKS:', tasks)
    console.log(immutatedTasks)


    return (
        <div className={"flex flex-col p-8 w-full bg-twitch-gray-300 rounded"}>
            <h1>История тасков</h1>
            <Suspense fallback={<TableSkeleton />}>
                <ScrollArea className={"px-4"}>
                    <Table className={"px-4"}>
                        <TableCaption>Всего {tasks && tasks.count} тасков</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Канал</TableHead>
                                <TableHead>Время завершения</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className={"overflow-scroll"}>
                            {
                                tasks && immutatedTasks.map((taskItem, index) => (
                                    <Dialog key={index}>
                                        <DialogTrigger asChild={true}>
                                            <TableRow key={index} className={"cursor-pointer"}>
                                                {
                                                    Object.entries(taskItem)
                                                        .map(([label, info], index) => {
                                                            if (label === 'complete_task' && typeof info === 'number') {
                                                                const formatted = new Date(info * 1000).toLocaleString('ru-RU').slice(0, -3)
                                                                return (
                                                                    <TableCell key={index}>{formatted}</TableCell>

                                                                )
                                                            }
                                                            return (
                                                                <TableCell key={index}>{info}</TableCell>
                                                            )
                                                        })
                                                }
                                            </TableRow>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <h3>Подробнее</h3>
                                            </DialogHeader>
                                            <div className={"flex flex-col"}>
                                                {
                                                    Object.entries(taskItem).map(([label, info], index) => (
                                                        <span key={index}><strong>{`${labelsMap[label]}`}:</strong> {`${info}`}</span>
                                                    ))
                                                }
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ))
                            }
                        </TableBody>
                    </Table>
                </ScrollArea>
            </Suspense>
        </div>
    )
}

export default TasksHistory