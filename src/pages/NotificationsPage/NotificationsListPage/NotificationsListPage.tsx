import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {NotificationList} from "@/widgets/notification"

import {notificationListModel} from "@/entities/notification/model";

export const NotificationsListPage = () => {
    const {
        page,
        lastPage,
        isPending,
        isFetching,
        list
    } = useSelector((state: RootState) => state.notificationList)
    const {
        filters
    } = useSelector((state: RootState) => state.notificationFilters)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <NotificationList
            list={list}
            page={page}
            lastPage={lastPage}
            isPending={isPending}
            isPagination={isFetching}
            onFetchNextPage={() => {
                dispatch(notificationListModel.thunks.fetchNextPageThunk({
                    type: filters.type === 'all' ? undefined : filters.type,
                    page,
                    project: filters.project.map(item => item.id),
                    subgroup: filters.subgroup.map(item => item.id),
                    schedule: filters.schedule.map(item => item.id)
                }))
            }}
        />
    )
}