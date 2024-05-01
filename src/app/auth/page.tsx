'use client'

import React from "react";
import {AuthForm} from "@features/auth/auth-form";

const AuthPage: React.FC = () => {
    return (
        <div className={"flex h-screen justify-center items-center"}>
            <AuthForm/>
        </div>
    )
}

// function SubmitButton() {
//     const { isValidating, isValid, dirty } = useFormikContext()
//
//     return (
//         <button
//             type={"submit"}
//             disabled={!isValid || isValidating !|| dirty}
//             className={"disabled:bg-gray-300 bg-twitch-purple-200 rounded py-1"}
//         >
//             Войти
//         </button>
//     )
// }

// const initialUser = {
//     email: '',
//     password: ''
// }

export default AuthPage