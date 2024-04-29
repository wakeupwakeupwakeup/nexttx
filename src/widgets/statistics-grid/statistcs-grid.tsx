import {BookCheck, Eye} from "lucide-react";

const data = [
    {
        label: "Количество тасков",
        count: 12,
        type: "task"
    },
    {
        label: "Количество активных тасков",
        count: 12,
        type: "task"
    },
    {
        label: "Количество зрителей",
        count: 573,
        type: "view"
    }
]

const icons: IconMap = {
    view: <Eye size={48} />,
    task: <BookCheck size={32} />
}
const StatisticsGrid: React.FC = () => {
    return (
        <div className={"w-full"}>
            <h1>
                Статистика сайта
            </h1>
            <div className={"grid grid-flow-col-dense p-6 rounded-xl gap-3 bg-twitch-gray-200"}>
                {
                    data.map((item: StatisticsData, index: number) => (
                        <div className={"flex flex-col items-end p-6 pl-12 rounded-xl bg-twitch-purple-200"} key={index}>
                            <h3 className={"mb-12"}>{item.label}</h3>
                            <div className={"flex items-center gap-2 justify-between"}>
                                {icons[item.type]}
                                <span className={"text-4xl font-bold"}>{item.count}</span>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default StatisticsGrid