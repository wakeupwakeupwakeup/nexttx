import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import {cookies} from "next/headers";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const accessToken = cookies().get('access_token')?.value
    return await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(() => {
            return NextResponse.next()
        })
        // .catch(async (e) => {
        //     console.log(e)
        //     const refreshToken = cookies().get('refresh_token')?.value
        //     return await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/token/refresh`,  refreshToken, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //         .then(async (res) => {
        //             await storeToken(res.data)
        //             return NextResponse.json({status: 200, data: cookies().get('access_token'), headers: {'Content-Type': 'application/json'}})
        //         })
        //         .catch((e) => {
        //             return NextResponse.json({}, {status: 400})
        //         })
        // })
        .catch(() => {
            return NextResponse.json({}, {status: 400})
        })
}