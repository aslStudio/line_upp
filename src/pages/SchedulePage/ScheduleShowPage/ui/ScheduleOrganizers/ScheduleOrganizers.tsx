import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

import styles from './ScheduleOrganizers.module.scss'

export const ScheduleOrganizers = () => {
    const {
        schedule
    } = useSelector((state: RootState) => state.scheduleExpand)

    return (
        <UserCellList
            className={styles.root}
            withBorder={true}
            title={'Организатор'}
            description={'Создатель расписания'}
            render={item => (
                <UserCell
                    key={item.id}
                    {...item}
                />
            )}
            list={schedule?.organizers ?? []}
        />
    )
}