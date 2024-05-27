import {NextRequest, NextResponse} from "next/server"

export async function GET(request: NextRequest) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/statistic`, {
        headers: new Headers({
            'Authorization': `Bearer ${request.cookies.get('access_token')?.value}`
        })
    })
    const data = await response.clone().json()
    console.log(request.cookies.get('access_token')?.value)
    return NextResponse.json(data, {status: 200})
}