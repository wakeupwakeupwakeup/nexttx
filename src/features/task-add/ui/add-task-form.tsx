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
import Cookies from "js-cookie";
import {redirect} from "next/navigation";


const AddTaskForm: React.FC = () => {
    const form = useForm<z.infer<typeof ViewersTaskSchema>>({
        resolver: zodResolver(ViewersTaskSchema),
        defaultValues: {
            channel: '',
            count: 0,
        }
    })

    function onSubmit(values: z.infer<typeof ViewersTaskSchema>) {
        console.log('sent')
        const combinedValues = {...values, properties: []};
        axios.post(`${process.env.NEXT_PUBLIC_API_HOST}tasks/stream/create`, combinedValues, {
            headers: {
                Authorization: `Bearer ${Cookies.get("refresh_token")}`,
                contentType: "application/json"
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    console.log(res)
                } else {
                    redirect(('/auth'))
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
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                            type="number"
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
                                    <FormLabel>Дата</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="date"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button onClick={() => {
                            console.log('clicked');
                        }} type={"submit"}>Создать</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddTaskForm