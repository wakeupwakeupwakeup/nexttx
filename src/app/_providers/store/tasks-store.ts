import {createStore} from 'zustand'
import {Task, TasksArray} from "@entities/task/types";

type StoreActions = {
    initiateTasks: (tasks: TasksArray) => void;
    addTask: (newTask: Task) => void,
    deleteTask: (taskId: number) => void
}

type TasksStore = TasksArray & StoreActions

const defaultInitState: TasksArray = {
    count: 0,
    tasks: []
}
export const createTasksStore = (
    initState: TasksArray = defaultInitState
) => {
    return createStore<TasksStore>()((set) => ({
        ...initState,
        initiateTasks: (tasks) => {
            set((state) => ({
                ...state,
                count: tasks.count,
                tasks: tasks.tasks
            }))
        },
        addTask: (newTask) => {
            set((state) => ({
                ...state,
                count: state.count + 1,
                tasks: [...state.tasks, newTask]
            }))
        },
        deleteTask: (taskId) => {
            set((state) => ({
                ...state,
                count: state.count - 1,
                tasks: state.tasks.filter((task) => task.id !== taskId)
            }))
        }
    }))
}