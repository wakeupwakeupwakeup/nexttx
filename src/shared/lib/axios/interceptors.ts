import axios from "axios"

const reqWithCredentials = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_LOCAL_HOST}/`
})


reqWithCredentials.interceptors.request.use(async (config) => {
    // const isValid = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/users/me`, {
    //     headers: {
    //         Authorization: `Bearer ${cookies().get('access_token')?.value}`
    //     }
    // })
    //     .then(() => {
    //         return true
    //     })
    //     .catch(() => {
    //         return false
    //     })
    // if (isValid) {
    //     config.headers.Authorization = `Bearer ${cookies().get('access_token')?.value}`
    //     return config
    // } else {
    //     const newToken = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/token/refresh`, cookies().get('refresh_token')?.value)
    //     await storeToken(newToken.data)
    //     config.headers.Authorization = `Bearer ${cookies().get('access_token')?.value}`
    //     return config
    // }
    const tokens = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/token`, {
        withCredentials: true
    })
    console.log(tokens)
    return config
})

export default reqWithCredentials