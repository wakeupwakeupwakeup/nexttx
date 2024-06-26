'use server'

import React, {Suspense} from "react";
import {labelMap, StatisticsData} from "@widgets/statistics-grid/statistics-grid.model";
import {cookies} from "next/headers";

async function getStatistics() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/statistics`, {
        credentials: 'same-origin',
        headers: new Headers({
            'Cookie': `access_token=${cookies().get('access_token')?.value}`,
        })
    })
    console.log(response)
    return await response.clone().json()
}

const StatisticsGrid: React.FC = async () => {
    const stats: StatisticsData = await getStatistics()

    return (
        <div className={"w-full"}>
            <h1>
                Статистика сайта
            </h1>
            <Suspense fallback={<div>Loading...</div>}>
                <div className={"grid grid-flow-col-dense p-6 rounded-xl gap-3 bg-twitch-gray-200 transition duration-700"}>
                    {
                        stats && Object.entries(stats).map(([label, value], index: number) =>
                            <div
                                className={"flex flex-col items-end p-6 pl-12 rounded-xl bg-twitch-purple-200 hover:scale-[1.02] transition-transform hover:bg-[#803aec] cursor-pointer"}
                                key={index}>
                                <h3 className={"mb-12"}>{labelMap[label] as keyof StatisticsData}</h3>
                                <div className={"flex items-center gap-2 justify-between"}>
                                    {/*{icons[item.type]}*/}
                                    <span className={"text-4xl font-bold"}>{value}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Suspense>
        </div>
    )
}

export default StatisticsGrid