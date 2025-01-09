import {useCallback, useMemo} from "react"
import {Link, useLocation} from "react-router-dom"

import {CalendarPaths, RootPaths} from "@/shared/lib"
import {Icon, IconProps} from "@/shared/ui/Icon"

import styles from './TabBar.module.scss'
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {createPortal} from "react-dom";

const data: {
    id: RootPaths,
    name: string
    icon: IconProps['name']
    path: string
}[] = [
    {
        id: RootPaths.CALENDAR,
        name: 'Календарь',
        icon: 'calendar',
        path: `${RootPaths.CALENDAR}/${CalendarPaths.WEEK}`,
    },
    {
        id: RootPaths.SCHEDULE_CALENDAR,
        name: 'Расписание',
        icon: 'star',
        path: `${RootPaths.SCHEDULE_CALENDAR}/${CalendarPaths.WEEK}`,
    },
    {
        id: RootPaths.PROJECT_CALENDAR,
        name: 'Проекты',
        icon: 'people',
        path: `${RootPaths.PROJECT_CALENDAR}/${CalendarPaths.WEEK}`,
    },
    {
        id: RootPaths.AUTH + '3' as RootPaths,
        name: 'Уведомления',
        icon: 'notifications',
        path: `${RootPaths.CALENDAR}/${CalendarPaths.WEEK}`,
    },
    {
        id: RootPaths.AUTH + '4' as RootPaths,
        name: 'Профиль',
        icon: 'profile',
        path: `${RootPaths.CALENDAR}/${CalendarPaths.WEEK}`,
    },
]

export const TabBar = () => {
    const location = useLocation()

    const isShow = useMemo(() => {
        return (
            !location.pathname.includes(RootPaths.AUTH) &&
            !location.pathname.includes(RootPaths.EVENTS) &&
            !location.pathname.includes(RootPaths.SCHEDULE) &&
            !location.pathname.includes(RootPaths.PROJECTS)
        )
    }, [location])

    const getView = useCallback((id: RootPaths) => {
        return location.pathname.includes(id) ? 'brand' : 'placeholder'
    }, [location])

    return createPortal(
        <TransitionFade className={styles.root}>
            {isShow && (
                <div className={styles.wrapper}>
                    {data.map(item => (
                        <Link
                            key={item.id}
                            className={styles.item}
                            to={item.path}
                        >
                            <Icon
                                name={item.icon}
                                size={30}
                                view={getView(item.id)}
                            />
                            <p>{item.name}</p>
                        </Link>
                    ))}
                </div>
            )}
        </TransitionFade>,
        document.body
    )
}