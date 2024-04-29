'use client'

import React from "react"
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@widgets/sidebar/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode}) => {
    const [isNavOpen, setIsNavOpen] = React.useState(true);
    return (
        <>
            <header className={"flex px-8 py-3 gap-8 bg-twitch-gray-400"}>
                <Image className={"cursor-pointer"} src={"/icons/menu.svg"} alt={""} width={20} height={16} onClick={() => setIsNavOpen(!isNavOpen)}/>
                <Link href={"/home"}>Mountain</Link>
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