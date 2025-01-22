import {Outlet} from "react-router-dom"

import styles from './UserPage.module.scss'

export const UserPage = () => (
    <div className={styles.root}>
        <Outlet />
    </div>
)