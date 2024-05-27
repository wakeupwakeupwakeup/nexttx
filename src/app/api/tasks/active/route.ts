import {NextRequest, NextResponse} from "next/server"

export async function GET(request: NextRequest) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/tasks/active`, {
        headers: new Headers({
            'Authorization': `Bearer ${request.cookies.get('access_token')?.value}`
        }),
        cache: 'no-cache',
    })
    const data = await response.clone().json()
    return NextResponse.json(data, {status: 200})
}