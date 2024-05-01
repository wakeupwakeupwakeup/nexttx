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
import Cookies from "js-cookie";
import {redirect} from "next/navigation";

const TasksHistory: React.FC = () => {
    const [tasks, setTasks] = React.useState<TasksArrayInfo>({
        count: 0,
        tasks: []
    })
    React.useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_HOST}tasks/history`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("refresh_token")}`,
                contentType: "application/json"
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    setTasks(res.data)
                }
            })
            .catch((err) => {
                if (err.status === 404) {
                    redirect('/auth')
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
                            <TableHead>Канал</TableHead>
                            <TableHead>Время создания</TableHead>
                            <TableHead>Время завершения</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className={"overflow-scroll"}>
                        {
                            tasks.tasks.map((task, index) => (
                                <TableRow key={index}>
                                    {
                                        Object.values(task).map((info, index) => (
                                            <TableCell key={index}>{info}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default TasksHistory