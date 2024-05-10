'use client'

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/shared/ui/@/components/ui/sheet";
import {Button} from "@/shared/ui/@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/ui/@/components/ui/tabs";
import React from "react";
import AddTaskForm from "@features/task-add/add-task-form.ui";


const TasksTabs: React.FC = () => {
    return (
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
                        {/*<TabsTrigger value={"registration"} className={"w-1/3"}>Регистрация</TabsTrigger>*/}
                        {/*<TabsTrigger value={"email"} className={"w-1/3"}>Почта</TabsTrigger>*/}
                        <TabsTrigger value={"viewers"} className={"w-1/3"}>Зрители</TabsTrigger>
                    </TabsList>
                    <TabsContent value={"viewers"}>
                        <AddTaskForm />
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    )
}

export default TasksTabs