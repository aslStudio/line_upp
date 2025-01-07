import {Outlet} from "react-router-dom"
import {clsx} from "clsx"

import {useRouteTransitionContext} from "@/shared/lib/providers"

import styles from './EventPage.module.scss'

export const EventPage = () => {
    const { eventsClass } = useRouteTransitionContext()

    return (
        <div
            className={clsx(
                styles.root,
                eventsClass,
            )}
        >
            <Outlet />
        </div>
    )
}