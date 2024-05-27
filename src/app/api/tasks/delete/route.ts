import {NextRequest, NextResponse} from "next/server"
import {revalidatePath} from "next/cache";

export async function POST(request: NextRequest) {
    const input = await request.json()
    console.log("BODY", JSON.stringify(input))
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/tasks/delete?` + new URLSearchParams({
        id: JSON.stringify(input),
        type: "stream"
    }), {
        method: "DELETE",
        headers: new Headers({
            'Authorization': `Bearer ${request.cookies.get('access_token')?.value}`,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(input)
    })
    console.log(response)
    revalidatePath('/', 'layout')
    return NextResponse.json( {status: 200})
}