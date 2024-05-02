'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/ui/@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {AuthSchema} from "@features/auth/model/auth.contracts";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {Input} from "@/shared/ui/@/components/ui/input";
import {Button} from "@/shared/ui/@/components/ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";

export const AuthForm: React.FC = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof AuthSchema>>({
        resolver: zodResolver(AuthSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof AuthSchema>) => {
        axios.post(`http://185.104.113.48:8000/users/login`, {
            ...values
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    const data = res.data
                    localStorage.setItem('access_token', res.data.access_token)
                    localStorage.setItem('refresh_token', data.refresh_token)

                    router.push('/home')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col w-1/3"}>
                <h1 className={"text-3xl font-medium text-center"}>Авторизация</h1>
                <FormField
                    control={form.control}
                    name={"username"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Имя пользователя</FormLabel>
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
                    name={"password"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type={"submit"} className={"bg-twitch-purple-200 mt-6"}>Войти</Button>
            </form>
        </Form>
    )
}