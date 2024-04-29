import React from "react";

import {Button} from "@/shared/ui/@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/shared/ui/@/components/ui/sheet";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/ui/@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/ui/@/components/ui/card";
import {Input} from "@/shared/ui/@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/shared/ui/@/components/ui/table";
import {ScrollArea} from "@/shared/ui/@/components/ui/scroll-area";
import {Label} from "@/shared/ui/@/components/ui/label";
import {Switch} from "@/shared/ui/@/components/ui/switch";

const HomePage: React.FC = () => {
    return (
        <div className={"flex flex-col p-8 w-full bg-twitch-gray-300 rounded"}>
            <div className={"flex justify-between"}>
                <h1>Задания</h1>
                <div className={"flex gap-3"}>
                    <Sheet>
                        <SheetTrigger asChild={true}>
                            <Button>Добавить задание</Button>
                        </SheetTrigger>
                        <SheetContent className={"flex flex-col gap-4 bg-twitch-gray-300 border-none"}>
                            <SheetHeader>
                                <SheetTitle>Добавить задание</SheetTitle>
                            </SheetHeader>
                            <Tabs defaultValue={"account"}>
                                <TabsList className={"flex w-full justify-between"}>
                                    <TabsTrigger value={"registration"} className={"w-1/3"}>Регистрация</TabsTrigger>
                                    <TabsTrigger value={"email"} className={"w-1/3"}>Почта</TabsTrigger>
                                    <TabsTrigger value={"viewers"} className={"w-1/3"}>Зрители</TabsTrigger>
                                </TabsList>
                                <TabsContent value={"viewers"}>
                                    <Card className={"border-none"}>
                                        <CardHeader>
                                            <CardTitle>Зрители</CardTitle>
                                            <CardDescription>Накрутка зрителей на трансляцию</CardDescription>
                                        </CardHeader>
                                        <CardContent className={"flex flex-col gap-3"}>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={"chanelName"}>Название канала</Label>
                                                <Input id={"chanelName"} type={"text"}/>
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={"viewersNumber"}>Количество зрителей</Label>
                                                <Input id={"viewersNumber"} type={"number"}/>
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={"time"}>Время</Label>
                                                <Input id={"time"} type={"time"} step={1}/>
                                            </div>
                                            <div className={"flex items-center justify-between"}>
                                                <Label htmlFor={"smoothBoost"}>Плавная накрутка</Label>
                                                <Switch id={"smoothBoost"}/>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value={"registration"}>
                                    <Card className={"border-none"}>
                                        <CardHeader>
                                            <CardTitle>Регистрация</CardTitle>
                                            <CardDescription>Автоматическая регистрация аккаунтов</CardDescription>
                                        </CardHeader>
                                        <CardContent className={"flex flex-col gap-3"}>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={"chanelName"}>Название канала</Label>
                                                <Input id={"chanelName"} type={"text"}/>
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={"viewersNumber"}>Количество зрителей</Label>
                                                <Input id={"viewersNumber"} type={"number"}/>
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={"time"}>Время</Label>
                                                <Input id={"time"} type={"time"} step={1}/>
                                            </div>
                                            <div className={"flex items-center justify-between"}>
                                                <Label htmlFor={"smoothBoost"}>Плавная накрутка</Label>
                                                <Switch id={"smoothBoost"}/>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value={"email"}>
                                    <Card className={"border-none"}>
                                        <CardHeader>
                                            <CardTitle>Зрители</CardTitle>
                                            <CardDescription>Накрутка зрителей на трансляцию</CardDescription>
                                        </CardHeader>
                                        <CardContent className={"flex flex-col gap-3"}>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={"chanelName"}>Название канала</Label>
                                                <Input id={"chanelName"} type={"text"}/>
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={"viewersNumber"}>Количество зрителей</Label>
                                                <Input id={"viewersNumber"} type={"number"}/>
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={"time"}>Время</Label>
                                                <Input id={"time"} type={"time"} step={1}/>
                                            </div>
                                            <div className={"flex items-center justify-between"}>
                                                <Label htmlFor={"smoothBoost"}>Плавная накрутка</Label>
                                                <Switch id={"smoothBoost"}/>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                            <SheetFooter>
                                <SheetClose>
                                    <Button>Создать</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
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
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>активно</TableCell>
                            <TableCell>5,852</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>не активно</TableCell>
                            <TableCell>0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>активно</TableCell>
                            <TableCell>5,852</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>активно</TableCell>
                            <TableCell>5,852</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>активно</TableCell>
                            <TableCell>5,852</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>активно</TableCell>
                            <TableCell>5,852</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>активно</TableCell>
                            <TableCell>5,852</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>активно</TableCell>
                            <TableCell>5,852</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>активно</TableCell>
                            <TableCell>5,852</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>Mellstroy</TableCell>
                            <TableCell>активно</TableCell>
                            <TableCell>5,852</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default HomePage