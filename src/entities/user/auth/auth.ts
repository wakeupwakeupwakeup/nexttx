'use server'

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
        sameSite: "lax",
        secure: false
    })

    cookies().set({
        name: "refresh_token",
        value: request.refresh_token,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    })
    return Promise.resolve()
}