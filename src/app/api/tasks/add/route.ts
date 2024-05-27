import {NextRequest, NextResponse} from "next/server"
import {revalidatePath} from "next/cache";

export async function POST(request: NextRequest) {
    const input = await request.json()
    console.log("BODY", JSON.stringify(input))
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/tasks/stream/create`, {
        method: "POST",
        headers: new Headers({
            'Authorization': `Bearer ${request.cookies.get('access_token')?.value}`,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(input)
    })
    revalidatePath('/', 'layout')
    return NextResponse.json( {status: 200})
}