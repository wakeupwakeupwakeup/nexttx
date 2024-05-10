'use server'

import axios from "axios"
import {cookies} from "next/headers";

export type AuthTokenData = {
    access_token: string,
    refresh_token: string,
    type: string
}

export const storeToken = async (request: AuthTokenData) => {
    cookies().set({
        name: "access_token",
        value: request.access_token,
        httpOnly: true,
        sameSite: "none",
        secure: true
    })

    cookies().set({
        name: "refresh_token",
        value: request.refresh_token,
        httpOnly: true,
        sameSite: "none",
        secure: true,
    })
    return Promise.resolve()
}

export const getRefreshToken = async () => {
    const cookiesStore = cookies()
    const authCookies = cookiesStore.getAll().reduce((acc, cookie) => {
        acc[cookie.name] = cookie.value
        return acc
    }, {})

    console.log(authCookies)
    console.log(cookiesStore)

    const cookiesString = Object.keys(authCookies).map(key => `${key}=${authCookies[key]}`).join('; ')
    return await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/auth`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookiesString
        }
    })
        .then((res) => {
            return res.data.data.value
        })
        .catch((err) => {
            return false
        })
}