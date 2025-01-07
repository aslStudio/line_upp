import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

import styles from './EventOrganizers.module.scss'

export const EventOrganizers = () => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand)

    return (
        <UserCellList
            className={styles.root}
            withBorder={true}
            title={'Организаторы'}
            description={'Ответственные за мероприятие'}
            render={item => (
                <UserCell
                    {...item}
                />
            )}
            list={event?.organizers ?? []}
        />
    )
}