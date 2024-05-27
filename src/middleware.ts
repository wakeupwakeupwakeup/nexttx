import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {cookies} from "next/headers";
import {isValid} from "@entities/user/auth/auth";

const protectedRoutes = ['/history', '/home', '/tasks']

export async function middleware(request: NextRequest, response: NextResponse) {
    const accessToken = cookies().get('access_token')?.value
    const path = request.nextUrl.pathname
    const isProtected = protectedRoutes.includes(path)
    console.log(`${request.nextUrl} :: `, accessToken)
    if (isProtected) {
        const session = await isValid()
        if (!session) {
            return NextResponse.redirect(new URL('/auth', request.url))
        }
        // console.log('VALID STATUS', session)
        // request.cookies.set('access_token', accessToken)
    }

    // if (cookies().getAll().length === 0 && !isProtected) {
    //     return NextResponse.redirect(new URL('/auth', request.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/:path*',
    ]
}