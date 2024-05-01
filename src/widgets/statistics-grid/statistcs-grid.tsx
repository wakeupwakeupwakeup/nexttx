'use client'

import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import {redirect} from "next/navigation";

const labelMap: Record<string, string> = {
    tasks_active: "Активных тасков",
    tasks_all: "Всего тасков",
    users_all: "Пользователей"
}

// const icons: IconMap = {
//     view: <Eye size={48} />,
//     task: <BookCheck size={32} />
// }
const StatisticsGrid: React.FC = () => {
    const [stats, setStats] = React.useState({})
    React.useEffect(() => {
        axios.get('http://185.104.113.48:8000/statistic', {
            headers: { Authorization: `Bearer ${Cookies.get('access_token')}` }
        })
            .then((res) => {
                if (res.status == 200) {
                    console.log(res)
                    setStats(res.data)
                } else {
                    redirect('/auth')
                }
            })
    }, []);
    return (
        <div className={"w-full"}>
            <h1>
                Статистика сайта
            </h1>
            <div className={"grid grid-flow-col-dense p-6 rounded-xl gap-3 bg-twitch-gray-200"}>
                {
                    Object.entries(stats).map(([label, value], index: number) => (
                        <div className={"flex flex-col items-end p-6 pl-12 rounded-xl bg-twitch-purple-200 hover:scale-[1.02] transition-transform hover:bg-[#803aec] cursor-pointer"} key={index}>
                            <h3 className={"mb-12"}>{labelMap[label] as keyof StatisticsData}</h3>
                            <div className={"flex items-center gap-2 justify-between"}>
                                {/*{icons[item.type]}*/}
                                <span className={"text-4xl font-bold"}>{typeof value === 'string' ? value : ''}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default StatisticsGrid