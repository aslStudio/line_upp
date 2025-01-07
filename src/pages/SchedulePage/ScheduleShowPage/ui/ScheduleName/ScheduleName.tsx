import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import styles from './ScheduleName.module.scss'

export const ScheduleName = () => {
    const {
        schedule
    } = useSelector((state: RootState) => state.scheduleExpand)

    return (
        <div className={styles.root}>
            <p>{schedule?.name ?? ''}</p>
        </div>
    )
}