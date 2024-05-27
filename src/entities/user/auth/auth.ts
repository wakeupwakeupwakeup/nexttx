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

export const isValid = async (): Promise<boolean> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/token`, {
        credentials: 'same-origin',
        headers: new Headers({
            'Cookie': `access_token=${cookies().get('access_token')?.value}`,
        })
    })
    return response.ok
}