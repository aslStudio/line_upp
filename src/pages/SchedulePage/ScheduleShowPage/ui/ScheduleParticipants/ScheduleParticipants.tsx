import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

import styles from './ScheduleParticipants.module.scss'

export const ScheduleParticipants = () => {
    const {
        schedule
    } = useSelector((state: RootState) => state.scheduleExpand)

    return (
        <UserCellList
            className={styles.root}
            withBorder={false}
            title={'Участники расписания'}
            render={item => (
                <UserCell
                    key={item.id}
                    {...item}
                />
            )}
            list={schedule?.participants ?? []}
        />
    )
}