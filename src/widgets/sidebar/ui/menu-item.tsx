import Link from "next/link";
import React from "react";

const MenuItem: React.FC<MenuProps> = ({icon, isCurrent, pathname, label}) => {
    return (
        <li className={isCurrent? "flex gap-24 justify-end items-center py-1 px-4 rounded bg-twitch-purple-200":
            "flex gap-24 justify-end items-center py-1 px-4 rounded"}>
            {
                isCurrent ? (
                React.cloneElement(icon as React.ReactElement, { color: "#222"})
            ) :
                icon
            }
            <Link href={pathname} className={isCurrent? "text-twitch-gray-400 font-semibold" : ""}>{label}</Link>
        </li>
    )
}

export default MenuItem