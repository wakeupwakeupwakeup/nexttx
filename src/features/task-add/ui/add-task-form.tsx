'use client'

import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/ui/@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/ui/@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import * as process from "process";
import {Input} from "@/shared/ui/@/components/ui/input";
import {ViewersTaskSchema} from "@features/task-add/model/task.contracts";
import {Button} from "@/shared/ui/@/components/ui/button";
import {redirect} from "next/navigation";
import {SheetClose} from "@/shared/ui/@/components/ui/sheet";


const AddTaskForm: React.FC = () => {
    const form = useForm<z.infer<typeof ViewersTaskSchema>>({
        resolver: zodResolver(ViewersTaskSchema),
        defaultValues: {
            channel: '',
            count: 0,
        }
    })

    function onSubmit(values: z.infer<typeof ViewersTaskSchema>) {
        const refresh_token = localStorage.getItem('refresh_token')
        const access_token = localStorage.getItem('access_token')
        const currentDate = new Date()
        const day = String(currentDate.getDate()).padStart(2, '0')
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        const year = currentDate.getFullYear();
        values.complete_datetime = `${year}-${month}-${day} ${values.complete_datetime}`
        const combinedValues = {...values, properties: []};
        axios.post(`${process.env.NEXT_PUBLIC_API_HOST}tasks/stream/create`, combinedValues, {
            headers: {
                Authorization: `Bearer ${refresh_token}`,
                contentType: "application/json"
            }
        })
            .then((res) => {

                if (res.status == 200) {
                    return
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
                                            return
                                        } else {
                                            redirect('/auth')
                                        }
                                    })
                            }
                        })
                }

            })
    }

    return (
        <Card className={"border-none"}>
            <CardHeader>
                <CardTitle>Зрители</CardTitle>
                <CardDescription>Накрутка зрителей на трансляцию</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col"}>
                        <FormField
                            control={form.control}
                            name={"channel"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Название канала</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"count"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Количество зрителей</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length > 1 && value.startsWith('0')) {
                                                    e.target.value = ''
                                                    field.onChange('')
                                                } else {
                                                    field.onChange(e.target.valueAsNumber)
                                                }
                                            }}
                                            min={1}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"complete_datetime"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Время</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="time"
                                            min={1}
                                            step={1}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <SheetClose asChild={true}>
                            <Button onClick={() => {
                            console.log('clicked');
                        }} type={"submit"}>Создать</Button>
                        </SheetClose>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddTaskForm