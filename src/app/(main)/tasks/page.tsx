'use client'

import React from "react";
import TasksControl from "@widgets/tasks-control/tasks-control.ui";
import {redirect} from "next/navigation";

const TasksPage: React.FC = () => {
    const refresh_token = localStorage.getItem('refresh_token')
    if (!refresh_token) {
        redirect('/auth')
    }
    return (
        <TasksControl />
    )
}

export default TasksPage