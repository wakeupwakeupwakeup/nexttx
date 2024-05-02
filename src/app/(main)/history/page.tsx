'use client'

import React from "react"
import TasksHistory from "@widgets/tasks-history/tasks-history.ui";
import {redirect} from "next/navigation";

const HistoryPage: React.FC = () => {
    const refresh_token = localStorage.getItem('refresh_token')
    if (!refresh_token) {
        redirect('/auth')
    }
    return (
        <TasksHistory/>
    )
}

export default HistoryPage