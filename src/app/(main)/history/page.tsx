import React from "react";
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

const HomePage: React.FC = () => {
    return (
        <div className={"flex flex-col p-8 w-full bg-twitch-gray-300 rounded"}>
            <h1>История тасков</h1>
            <ScrollArea className={"px-4"}>
                <Table className={"px-4"}>
                    <TableCaption>Всего 5 тасков</TableCaption>
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
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Зрители</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>28.04.2024 08:24:32</TableCell>
                            <TableCell>29.04.2024 14:57:01</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>Регистрация</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>28.04.2024 08:24:32</TableCell>
                            <TableCell>29.04.2024 14:57:01</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Регистрация</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>28.04.2024 08:24:32</TableCell>
                            <TableCell>29.04.2024 14:57:01</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>4</TableCell>
                            <TableCell>Регистрация</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>28.04.2024 08:24:32</TableCell>
                            <TableCell>29.04.2024 14:57:01</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5</TableCell>
                            <TableCell>Регистрация</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>28.04.2024 08:24:32</TableCell>
                            <TableCell>29.04.2024 14:57:01</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default HomePage