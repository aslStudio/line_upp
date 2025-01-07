import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

export const ScheduleParticipants = () => {
    const {
        schedule
    } = useSelector((state: RootState) => state.scheduleExpand)

    return (
        <UserCellList
            withBorder={false}
            title={'Участники расписания'}
            render={item => (
                <UserCell
                    {...item}
                />
            )}
            list={schedule?.participants ?? []}
        />
    )
}