import { Outlet } from 'react-router-dom'

import styles from './Faq.module.scss'

export const FaqPage = () => (
    <div className={styles.root}>
        <Outlet />
    </div>
)