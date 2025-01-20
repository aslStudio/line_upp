import {Outlet} from "react-router-dom"

import styles from './ProfilePage.module.scss'

export const ProfilePage = () => (
    <div className={styles.root}>
        <Outlet />
    </div>
)