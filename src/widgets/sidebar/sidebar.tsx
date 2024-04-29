import React from "react";
import {BookCheck, History, Home} from "lucide-react";
import MenuItem from "@widgets/sidebar/ui/menu-item";
import {usePathname} from "next/navigation";

const menu = [
    {
        label: "Главная",
        icon: <Home />,
        pathname: "/home"
    },
    {
        label: "Задания",
        icon: <BookCheck />,
        pathname: "/tasks"
    },
    {
        label: "История",
        icon: <History />,
        pathname: "/history"
    }
]
const Sidebar: React.FC<SidebarProps> = ({opened}) => {
    const currentPath = usePathname()

    return (
        <aside className={!opened ? "-translate-x-full w-0 duration-500" : "p-8 h-full bg-twitch-gray-300 duration-500 text-lg"}>
            <nav className={"min-w-32"}>
                <ul className={!opened ? "hidden duration-500" : "flex flex-col gap-2"}>
                    {
                        menu.map((item: MenuProps, index) => (
                            <MenuItem icon={item.icon} label={item.label} pathname={item.pathname} isCurrent={currentPath === item.pathname} key={index} />
                        ))
                    }
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar