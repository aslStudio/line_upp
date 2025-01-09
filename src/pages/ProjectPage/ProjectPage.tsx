import {Outlet} from "react-router-dom"

import styles from './ProjectPage.module.scss'

export const ProjectPage = () => {
    return (
        <div className={styles.root}>
            <Outlet />
        </div>
    )
}