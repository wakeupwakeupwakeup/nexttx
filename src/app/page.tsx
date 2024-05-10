import Cookies from "js-cookie";
import {redirect} from "next/navigation";

export default function Home() {
    const accessToken = Cookies.get("accessToken")

    if (accessToken) {
        redirect('/home')
    } else {
        redirect(`/auth`)
    }
}
