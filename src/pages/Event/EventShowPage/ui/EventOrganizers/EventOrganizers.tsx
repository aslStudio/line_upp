import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {UserCell, UserCellList} from "@/entities/user/ui"

export const EventOrganizers = () => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand)

    return (
        <UserCellList
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