export type TTask = {
    channel: string
    complete_task: string
    id: number
    status: string
    sub_id: number
}

export type TTasksArray = {
    count: number
    tasks: TTask[]
}

export type THistoryTask = Pick<TTask, 'id' | 'channel' | 'complete_task'>

export const labelsMap: Record<string, string> = {
    id: "ID",
    sub_id: "Sub ID",
    type: "Тип",
    status: "Статус",
    channel: "Канал",
    complete_task: "Время завершения"
}
