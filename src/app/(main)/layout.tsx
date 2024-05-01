'use client'

import React from "react"
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@widgets/sidebar/sidebar";
import {Badge} from "@/shared/ui/@/components/ui/badge";
import Cookies from "js-cookie";
import {redirect} from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode}) => {
    const [isNavOpen, setIsNavOpen] = React.useState(true);
    const access_token = Cookies.get('access_token')
    if (!access_token) {
        return redirect('/auth')
    }
    return (
        <>
            <header className={"flex items-center justify-between px-8 py-3 gap-8 bg-twitch-gray-400"}>
                <div className={"flex gap-4"}>
                    <Image className={"cursor-pointer"} src={"/icons/menu.svg"} alt={""} width={20} height={16} onClick={() => setIsNavOpen(!isNavOpen)}/>
                    <div className={"flex gap-2 items-start"}>
                        <Link className={"text-xl uppercase"} href={"/home"}>Mountain</Link>
                        <div>
                            <Badge className={"bg-twitch-purple-200 text-[10px]"}>v0.1</Badge>
                        </div>
                    </div>
                </div>
                <div className={"flex gap-4 items-center"}>
                    <Link className={"uppercase flex gap-1 items-center"} href={""}><Image src={"/logos/discord.svg"} alt={"Discord"} width={13} height={10} />Discord</Link>
                    <Link className={"uppercase"} href={""}>Telegram</Link>
                </div>
            </header>
            <div className={"flex h-full grow"}>
                <Sidebar opened={isNavOpen} />
                <main className={"flex p-6 w-full"}>
                    {children}
                </main>
            </div>
        </>
    )
}

export default MainLayout