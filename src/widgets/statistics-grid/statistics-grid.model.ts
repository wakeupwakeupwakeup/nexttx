export type StatisticsData = {
    tasks_active: number,
    tasks_all: number,
    users_all: number
}
export const labelMap: Record<string, string> = {
    tasks_active: "Активных тасков",
    tasks_all: "Всего тасков",
    users_all: "Пользователей"
}