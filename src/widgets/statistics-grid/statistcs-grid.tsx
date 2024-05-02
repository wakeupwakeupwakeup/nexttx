'use client'

import axios from "axios";
import React from "react";
import {redirect} from "next/navigation";
import {Skeleton} from "@/shared/ui/@/components/ui/skeleton";

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
    const [stats, setStats] = React.useState<StatisticsData>({
        tasks_active: 0,
        tasks_all: 0,
        users_all: 0,
    })
    const [isDataLoading, setIsDataLoading] = React.useState(true)

    React.useEffect(() => {
        const refresh_token = localStorage.getItem('refresh_token')
        const access_token = localStorage.getItem('access_token')
        if (!refresh_token) {
            redirect('/auth')
        }
        axios.get(`http://185.104.113.48:8000/statistic`, {
            headers: { Authorization: `Bearer ${access_token}` }
        })
            .then((res) => {
                if (res.status == 200) {
                    setStats(res.data)
                    setIsDataLoading(false)
                }
            })
            .catch(() => {
                axios.post(`http://185.104.113.48:8000/token/refresh`, {refresh_token: refresh_token})
                    .then((res) => {
                        if (res.status === 200) {
                            localStorage.setItem('access_token', res.data.access_token)
                            axios.get(`http://185.104.113.48:8000/statistic`, {
                                headers: { Authorization: `Bearer ${access_token}` }
                            })
                                .then((res) => {
                                    if (res.status == 200) {
                                        console.log(res)
                                        setStats(res.data)
                                        setIsDataLoading(false)
                                    } else {
                                        redirect('/auth')
                                    }
                                })
                        } else {
                            redirect('/auth')
                        }
                    })
            })
    }, []);

    return (
        <div className={"w-full"}>
            <h1>
                Статистика сайта
            </h1>
            <div className={"grid grid-flow-col-dense p-6 rounded-xl gap-3 bg-twitch-gray-200"}>
                {
                    isDataLoading ? (
                            <>
                                <Skeleton className={"w-full h-36"} />
                                <Skeleton className={"w-full h-36"} />
                                <Skeleton className={"w-full h-36"} />
                            </>

                        ) :
                            Object.entries(stats).map(([label, value], index: number) =>
                                <div className={"flex flex-col items-end p-6 pl-12 rounded-xl bg-twitch-purple-200 hover:scale-[1.02] transition-transform hover:bg-[#803aec] cursor-pointer"} key={index}>
                                    <h3 className={"mb-12"}>{labelMap[label] as keyof StatisticsData}</h3>
                                    <div className={"flex items-center gap-2 justify-between"}>
                                        {/*{icons[item.type]}*/}
                                        <span className={"text-4xl font-bold"}>{value}</span>
                                    </div>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default StatisticsGrid