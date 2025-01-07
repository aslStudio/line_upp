import {Outlet} from "react-router-dom"

import styles from './SchedulePage.module.scss'

export const SchedulePage = () => {
    return (
        <div className={styles.root}>
            <Outlet />
        </div>
    )
}