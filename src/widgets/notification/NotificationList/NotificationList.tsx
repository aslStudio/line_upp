import React, {useEffect, useMemo} from "react"

import {NotificationPaths, PropsDefault, RootPaths} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Loader} from "@/shared/ui/Loader"

import styles from './NotificationList.module.scss'
import {useLocation} from "react-router-dom";
import {clsx} from "clsx";
import {
    EventNotification,
    eventNotificationType, EventReminderNotification,
    Notification as NotificationObjectType,
    NotificationBase, ProjectNotification, projectNotificationType, UpdatedEventNotification
} from "@/shared/kernel.ts";
import {
    NotificationEvent,
    NotificationEventUpdate,
    NotificationProject,
    NotificationReminder
} from "@/entities/notification/ui";
import {NotificationType} from "@/shared/api/enum.ts";

import { useNotificationListContext } from './NotificationListProvider.tsx'
import {useNotificationActions} from "@/features/notification/hooks";

export type NotificationListProps = PropsDefault<{
    list: NotificationObjectType[]
    page: number
    lastPage: number
    isPending: boolean
    isPagination: boolean
    onFetchNextPage: () => void
}>

export const NotificationList: React.FC<NotificationListProps> = ({
    className,
    list,
    page,
    lastPage,
    isPending,
    isPagination,
    onFetchNextPage
}) => {
    const location = useLocation()

    const { listRef } = useNotificationListContext()

    const offset = useMemo(() => {
        if (
            location.pathname.includes(RootPaths.NOTIFICATION) &&
            location.pathname.includes(NotificationPaths.LIST)
        ) {
            return 'list'
        }

        return 'archive'
    }, [])

    useEffect(() => {
        if (listRef.current) {
            listRef.current.addEventListener('scroll', () => {
                const element = listRef.current
                if (element) {
                    const isBottom =
                        element.scrollHeight - element.scrollTop === element.clientHeight

                    if (isBottom && page < lastPage) {
                        onFetchNextPage()
                    }
                }
            })
        }
    }, [listRef.current, page, lastPage, onFetchNextPage]);

    return (
        <div
            className={clsx(
                styles.root,
                styles[`offset_${offset}`],
                className,
            )}
        >
            <TransitionFade>
                {isPending && (
                    <div className={styles.loader}>
                        <Loader
                            color={'brand'}
                            size={'m'}
                        />
                    </div>
                )}
                {!isPending && !list.length && (
                    <div className={styles.empty}>
                        <p className={styles['empty-emoji']}>🙈</p>
                        <p className={styles['empty-title']}>
                            Пока уведомлений нет
                        </p>
                    </div>
                )}
                {!isPending && list.length && (
                    <div className={styles.list}>
                        {list.map(item => (
                            <NotificationCard
                                notification={item}
                            />
                        ))}
                        <TransitionFade>
                            {isPagination && (
                                <Loader
                                    color={'brand'}
                                    size={'m'}
                                />
                            )}
                        </TransitionFade>
                    </div>
                )}
            </TransitionFade>
        </div>
    )
}

const NotificationCard: React.FC<{
    notification: NotificationObjectType
}> = ({
    notification
}) => {
    const {
        isArchiving,
        approve,
        send,
        reject,
        archive,
        submit
    } = useNotificationActions()

    if (eventNotificationType.includes(notification.type as typeof eventNotificationType[number])) {
        return (
            <NotificationEvent
                notification={notification as NotificationBase & EventNotification}
                isArchiving={isArchiving}
                onArchive={() => archive(notification)}
                onSubmit={() => {
                    if ([
                        NotificationType.PARTICIPANT_CREATED_NEW_PUBLIC_EVENT
                    ].includes(notification.type)) {
                        send(notification)
                        return;
                    }

                    if ([
                        NotificationType.PARTICIPANT_NEED_SUBMIT_PARTICIPATION,
                        NotificationType.PARTICIPANT_PARTICIPATION_REQUEST_APPROVED,
                    ].includes(notification.type)) {
                        submit(notification)
                        return
                    }

                    approve(notification)
                }}
                onReject={() => reject(notification)}
            />
        )
    }

    if (projectNotificationType.includes(notification.type as typeof projectNotificationType[number])) {
        return (
            <NotificationProject
                notification={notification as NotificationBase & ProjectNotification}
                isArchiving={isArchiving}
                onArchive={() => archive(notification)}
                onSubmit={() => {}}
                onReject={() => reject(notification)}
            />
        )
    }

    if (notification.type === NotificationType.EVENT_WAS_UPDATED) {
        return (
            <NotificationEventUpdate
                notification={notification as NotificationBase & UpdatedEventNotification}
                isArchiving={isArchiving}
                onArchive={() => archive(notification)}
            />
        )
    }

    return (
        <NotificationReminder
            notification={notification as NotificationBase & EventReminderNotification}
            isArchiving={isArchiving}
            onArchive={() => archive(notification)}
        />
    )
}