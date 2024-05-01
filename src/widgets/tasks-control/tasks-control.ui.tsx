import TasksSheet from "@widgets/tasks-control/ui/tasks-tabs";
import {Button} from "@/shared/ui/@/components/ui/button";
import {ScrollArea} from "@/shared/ui/@/components/ui/scroll-area";
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/shared/ui/@/components/ui/table";
import React from "react";

const TasksControl: React.FC = () => {
    return (
        <div className={"flex flex-col p-8 w-full bg-twitch-gray-300 rounded"}>
            <div className={"flex justify-between"}>
                <h1>Задания</h1>
                <div className={"flex gap-3"}>
                    <TasksSheet/>
                    <Button variant={"destructive"} disabled={true}>Удалить</Button>
                </div>
            </div>
            <ScrollArea className={"px-4"}>
                <Table className={"px-4"}>
                    <TableCaption>Список Ваших заданий</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Канал</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Зрители</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className={"overflow-scroll"}>

                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default TasksControl