import {NextResponse} from "next/server";
import axios from "axios";
import {cookies} from "next/headers";
import {storeToken} from "@entities/user/auth/auth";

export async function GET(): Promise<NextResponse> {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/me`, {
        headers: {
            Authorization: `Bearer ${cookies().get("access_token")?.value}`
        }
    })
        .then(() => {
            return NextResponse.next()
        })
        .catch(async () => {
            return await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/token/refresh`,  cookies().get('refresh_token')?.value, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(async (res) => {
                    await storeToken(res.data)
                    return NextResponse.json({status: 200, data: cookies().get('access_token'), headers: {'Content-Type': 'application/json'}})
                })
                .catch((e) => {
                    return NextResponse.json({}, {status: 400})
                })
        })
}