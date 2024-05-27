import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
    return await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users/me`, {
        headers: new Headers({
            'Authorization': `Bearer ${cookies().get('access_token')?.value}`,
        })
    })
        .then(res => {
            // console.log(`CURRENT ACCESS TOKEN: ${cookies().get('access_token')?.value} \n CHECK TOKEN`, res)
            // console.log(cookies().get('access_token')?.value)
            if (res.ok) {
                return NextResponse.json({}, {status: 200})
            } else {
                return NextResponse.json({}, {status: 400})
            }
        })
        .catch(() => {
            return NextResponse.json({}, {status: 500})
        })
}