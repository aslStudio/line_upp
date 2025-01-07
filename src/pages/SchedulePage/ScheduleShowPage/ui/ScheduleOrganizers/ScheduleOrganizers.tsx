import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

export const ScheduleOrganizers = () => {
    const {
        schedule
    } = useSelector((state: RootState) => state.scheduleExpand)

    return (
        <UserCellList
            withBorder={true}
            title={'Организатор'}
            description={'Создатель расписания'}
            render={item => (
                <UserCell
                    {...item}
                />
            )}
            list={schedule?.organizers ?? []}
        />
    )
}