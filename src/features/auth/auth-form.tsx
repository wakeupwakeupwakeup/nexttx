'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/ui/@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {AuthSchema} from "@/entities/user/auth/auth.contracts";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {Input} from "@/shared/ui/@/components/ui/input";
import {Button} from "@/shared/ui/@/components/ui/button";
import {useRouter} from "next/navigation";
import {AuthTokenData, storeToken} from "@entities/user/auth/auth";
import axios from "axios";
import {useToast} from "@/shared/ui/@/components/ui/use-toast";
import {Toaster} from "@/shared/ui/@/components/ui/toaster";
import {errorMap} from "@/shared/errors/errors-map";

export const AuthForm: React.FC = () => {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof AuthSchema>>({
        resolver: zodResolver(AuthSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = async (formValues: z.infer<typeof AuthSchema>) => {
        await axios.post<AuthTokenData>(`${process.env.NEXT_PUBLIC_API_HOST}/users/login`, {
            ...formValues
        },{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(async (res) => {
                if (res.status === 200) {
                    console.log(res)
                    await storeToken(res.data)
                    router.push('/home')
                }
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Ошибка",
                    description: errorMap[err.response.data.detail],
                })
            })
    }

    return (
        <div className={"flex h-screen justify-center items-center"}>
            <Toaster />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col w-1/4"}>
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
        </div>
    )
}