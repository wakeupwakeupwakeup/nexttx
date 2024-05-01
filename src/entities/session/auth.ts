'use client'

import Cookies from "js-cookie";

export function isAuthenticated() {
    const access_token = Cookies.get("access_token")
    return !!access_token
}