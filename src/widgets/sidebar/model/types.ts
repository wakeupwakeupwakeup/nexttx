type SidebarProps = {
    opened: boolean,
}

type MenuProps = {
    label: string,
    icon: React.ReactNode,
    isCurrent?: boolean,
    pathname: string
}