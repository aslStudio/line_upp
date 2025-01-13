import {useEffect} from "react"
import {Outlet, useLocation} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {NotificationHeader, useNotificationListContext} from "@/widgets/notification"

import {notificationArchiveModel, notificationListModel} from "@/entities/notification/model"

import {NotificationPaths} from "@/shared/lib"

import styles from './NotificationsPage.module.scss'

export const NotificationsPage = () => {
    const { listRef } = useNotificationListContext()

    const location = useLocation()

    const { filters } = useSelector((state: RootState) => state.notificationFilters)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (location.pathname.includes(NotificationPaths.LIST)) {
            dispatch(notificationListModel.thunks.fetchListThunk({
                project: filters.project.map(item => item.id),
                subgroup: filters.subgroup.map(item => item.id),
                schedule: filters.schedule.map(item => item.id)
            }))
        } else {
            dispatch(notificationArchiveModel.thunks.fetchListThunk({
                project: filters.project.map(item => item.id),
                subgroup: filters.subgroup.map(item => item.id),
                schedule: filters.schedule.map(item => item.id)
            }))
        }
    }, [filters, location]);

    return (
        <div
            ref={listRef}
            className={styles.root}
        >
            <NotificationHeader />
            <Outlet />
        </div>
    )
}