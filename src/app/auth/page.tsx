'use client'

import React from "react";
import {ErrorMessage, Field, Form, Formik, useFormikContext,} from "formik"

const AuthPage: React.FC = () => {
    return (
        <div className={"flex h-screen justify-center items-center"}>
            <Formik
                onSubmit={(e) => e.preventDefault()}
                initialValues={initialUser}
            >
                <Form className={"w-1/4"}>
                    <h1 className={"text-center"}>Авторизация</h1>
                    <div className={"flex flex-col gap-4 font-body font-semibold"}>
                        <div className={"flex flex-col"}>
                            <label>Имя пользователя</label>
                            <Field
                                type="text"
                                as={"input"}
                                name={"email"}
                                className={"w-full py-1 px-2 rounded text-black tracking-widest"}
                            />
                            <ErrorMessage name={"email"}/>
                        </div>
                        <div className={"flex flex-col"}>
                            <label>Пароль</label>
                            <Field
                                type="password"
                                as={"input"}
                                name={"password"}
                                className={"w-full py-1 px-2 rounded text-black tracking-widest"}
                            />
                            <ErrorMessage name={"password"}/>
                            <a className={"font-normal text-twitch-purple-100"}>Не удается войти?</a>
                        </div>
                        <SubmitButton />
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

function SubmitButton() {
    const { isValidating, isValid, dirty } = useFormikContext()

    return (
        <button
            type={"submit"}
            disabled={!isValid || isValidating !|| dirty}
            className={"disabled:bg-gray-300 bg-twitch-purple-200 rounded py-1"}
        >
            Войти
        </button>
    )
}

const initialUser: sessionTypes.LoginUserDto = {
    email: '',
    password: ''
}

export default AuthPage