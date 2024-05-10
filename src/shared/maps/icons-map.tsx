import {BookCheck, Eye} from "lucide-react";
import React from "react";


export type IconMap = {
    [key: string]: React.ReactNode,
}

export const icons: IconMap = {
    view: <Eye size={48} />,
    task: <BookCheck size={32} />
}

