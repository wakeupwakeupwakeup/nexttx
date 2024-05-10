import axios from "axios"
import {getRefreshToken} from "@entities/user/auth/auth";

const reqWithCredentials = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_LOCAL_HOST}/`
})

reqWithCredentials.interceptors.request.use(async (config) => {
    if (config.url?.includes('login')) {
        return config
    }

    const token = await getRefreshToken()
        console.log(token)

    if (token) {
        config.headers!['Authorization'] = `Bearer ${token}`
        return config
    }

    return config

    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default reqWithCredentials