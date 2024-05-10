'use client'

import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/ui/@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/ui/@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/shared/ui/@/components/ui/input";
import {Button} from "@/shared/ui/@/components/ui/button";
import {ViewersTaskSchema} from "@entities/task/task.contracts";
import {Label} from "@/shared/ui/@/components/ui/label";
import {Switch} from "@/shared/ui/@/components/ui/switch";
import {ScrollArea} from "@/shared/ui/@/components/ui/scroll-area";
import {onSubmit} from "@features/task-add/add-task-form.actions";


const AddTaskForm: React.FC = () => {
    const [isSmoothing, setIsSmoothing] = React.useState(false);
    const [timingsCount, setTimingsCount] = React.useState(1)
    const form = useForm<z.infer<typeof ViewersTaskSchema>>({
        resolver: zodResolver(ViewersTaskSchema),
        defaultValues: {
            channel: '',
            viewers: 1,
            timingsCount: 0
        }
    })



    React.useEffect(() => {
        form.setValue("timingsCount", timingsCount);
    }, [timingsCount, form]);

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
                            name={"viewers"}
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
                            name={"duration"}
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Время</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="time"
                                                min={1}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />
                        <div className="flex justify-between items-center my-4">
                            <Label htmlFor={"smoothing"}>Плавная накрутка</Label>
                            <Switch id={"smoothing"} onCheckedChange={() => setIsSmoothing(!isSmoothing)} />
                        </div>
                        {
                            isSmoothing &&  (
                                <FormField
                                    control={form.control}
                                    name={"timingsCount"}
                                    render={({field}) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Количество таймингов</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        min={1}
                                                        onChange={(event) => setTimingsCount(parseInt(event.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )
                                    }}
                                />
                            )
                        }
                        <ScrollArea className={"h-72"}>
                            {
                                timingsCount > 0 && isSmoothing && Array.from({ length: timingsCount}, (_, index) => (
                                    <div key={index} className="flex gap-2">
                                        <FormField
                                            defaultValue={1}
                                            control={form.control}
                                            name={`timing.${index}.time`}
                                            render={({field}) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel>Минута</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type="number"
                                                                min={1}
                                                                onChange={(e) => {
                                                                    field.onChange(parseInt(e.target.value))
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                        <FormField
                                            defaultValue={1}
                                            control={form.control}
                                            name={`timing.${index}.count`}
                                            render={({field}) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel>Зрители</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type="number"
                                                                min={1}
                                                                onChange={(e) => {
                                                                    field.onChange(parseInt(e.target.value))
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    </div>
                                ))
                            }
                        </ScrollArea>
                        {/*<SheetClose asChild={true}>*/}
                            <Button onClick={() => {
                                console.log('clicked');
                            }} type={"submit"}>Создать</Button>
                        {/*</SheetClose>*/}
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddTaskForm