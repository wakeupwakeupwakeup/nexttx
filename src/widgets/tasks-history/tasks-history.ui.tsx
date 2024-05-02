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
import React from "react";
import axios from "axios";
import {redirect} from "next/navigation";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/shared/ui/@/components/ui/dialog";

const labelsMap: Record<string, string> = {
    id: "ID",
    sub_id: "Sub ID",
    type: "Тип",
    status: "Статус",
    channel: "Канал",
    complete_task: "Дата завершения"
}

const TasksHistory: React.FC = () => {
    const [tasks, setTasks] = React.useState<TasksArrayInfo>({
        count: 0,
        tasks: []
    })

    React.useEffect(() => {
        const refresh_token = localStorage.getItem('refresh_token')
        const access_token = localStorage.getItem('access_token')
        axios.get(`http://185.104.113.48:8000/tasks/history`, {
            headers: {
                Authorization: `Bearer ${refresh_token}`,
                contentType: "application/json"
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    setTasks(res.data)
                } else {
                    axios.post(`http://185.104.113.48:8000/token/refresh`, refresh_token)
                        .then((res) => {
                            if (res.status === 200) {
                                localStorage.setItem('access_token', res.data.access_token)
                                axios.get(`http://185.104.113.48:8000/statistic`, {
                                    headers: { Authorization: `Bearer ${access_token}` }
                                })
                                    .then((res) => {
                                        if (res.status == 200) {
                                            setTasks(res.data)
                                        } else {
                                            redirect('/auth')
                                        }
                                    })
                            }
                        })
                }
            })
    }, [])

    return (
        <div className={"flex flex-col p-8 w-full bg-twitch-gray-300 rounded"}>
            <h1>История тасков</h1>
            <ScrollArea className={"px-4"}>
                <Table className={"px-4"}>
                    <TableCaption>Всего {tasks.count} тасков</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Тип</TableHead>
                            <TableHead>Время завершения</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className={"overflow-scroll"}>
                        {
                            tasks.tasks.map((taskItem, index) => (
                                <Dialog>
                                    <DialogTrigger asChild={true}>
                                        <TableRow key={index} className={"cursor-pointer"}>
                                            {
                                                Object.entries(taskItem)
                                                    .filter(([key, value]) => ['id', 'type', 'complete_task'].includes(key))
                                                    .map(([label, info], index) => (
                                                        <TableCell key={index}>{info}</TableCell>
                                                    ))
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
                                                    <span><strong>{`${labelsMap[label]}`}:</strong> {`${info}`}</span>
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
        </div>
    )
}

export default TasksHistory