import {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
    console.log(`middleware cookies: ${request.cookies.getAll().length}`)
    // const cookiesStore = cookies()
    // const accessToken = cookiesStore.get('access_token').value
    // console.log(accessToken)
    // console.log('HHHHHEYYYY')
    // // if (accessToken && request.nextUrl.pathname !== '/auth') {
    // //     return NextResponse.next()
    // // }
    // // return NextResponse.redirect(new URL('/auth', request.url))
    //
    // return NextResponse.next()
}

export const config = {
    matcher: [
        '/'
    ]
}