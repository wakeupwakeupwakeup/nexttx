import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
    const token = cookies().get('access_token')
    console.log(request)
    console.log(token)
    console.log(request.cookies.getAll())
    return NextResponse.json({
        access_token: cookies().get('access_token')?.value,
        refresh_token: cookies().get('refresh_token')?.value,
    }, {status: 200})
}