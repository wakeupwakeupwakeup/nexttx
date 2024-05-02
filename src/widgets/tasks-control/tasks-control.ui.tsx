import TasksSheet from "@widgets/tasks-control/ui/tasks-tabs";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/shared/ui/@/components/ui/alert-dialog";

const TasksControl: React.FC = () => {
    const [activeTasks, setActiveTasks] = React.useState<TasksArray>({
        tasks: [],
        count: 0
    })

    const handleDelete = async (id, type) => {
        const access_token = localStorage.getItem('access_token')
        axios.delete('http://185.104.113.48:8000/tasks/delete', {
            params: {
                id: id,
                type: type
            },
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then((res) => {
                console.log(res)
            })
    }

    React.useEffect(() => {
        const refresh_token = localStorage.getItem('refresh_token')
        if (!refresh_token) {
            redirect('/auth')
        }

        axios.get('http://185.104.113.48:8000/tasks/active', {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    setActiveTasks(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    axios.post('http://185.104.113.48:8000/token/refresh', {
                        refresh_token: refresh_token
                    })
                        .then((res) => {
                            if (res.status === 200) {
                                localStorage.setItem('access_token', res.data.access_token)
                                axios.get('http://185.104.113.48:8000/tasks/active', {
                                    headers: {
                                        accept: "application/json",
                                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                    }
                                })
                                    .then((res) => {
                                        setActiveTasks(res.data)
                                    })
                            } else {
                                redirect('/auth')
                            }
                        })
                }
            })
    }, [])
    return (
        <div className={"flex flex-col p-8 w-full bg-twitch-gray-300 rounded"}>
            <div className={"flex justify-between"}>
                <h1>Задания</h1>
                <div className={"flex gap-3"}>
                    <TasksSheet/>
                </div>
            </div>
            <ScrollArea className={"px-4"}>
                <Table className={"px-4"}>
                    <TableCaption>Всего {activeTasks.count} {activeTasks.count <= 4 ? "таска" : "тасков"}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>SubID</TableHead>
                            <TableHead>Тип</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Канал</TableHead>
                            <TableHead>Дата создания</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            activeTasks.tasks.map((task, index) => (
                                <TableRow key={index}>
                                    {
                                        Object.entries(task).map(([label, value], index) => (
                                            <TableCell key={index}>{value}</TableCell>
                                        ))
                                    }
                                    <TableCell>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <span className={"cursor-pointer hover:underline"}>удалить</span>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Вы действительно хотите удалить таску?</AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Нет</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(task.id, task.type)}>Да</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default TasksControl