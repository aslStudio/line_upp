import React from "react"

import {PropsDefault} from "@/shared/lib"
import {Notification, NotificationBase, UpdatedEventNotification} from "@/shared/kernel.ts"

import { NotificationCardBase } from '../NotificationCardBase'

import styles from './NotificationEventUpdate.module.scss'
import {Icon} from "@/shared/ui/Icon";
import {formatDate, formatTimeDifference, getTimeRange} from "@/shared/lib/date.ts";
import {clsx} from "clsx";

export type NotificationEventUpdateProps = PropsDefault<{
    notification: NotificationBase & UpdatedEventNotification
    isArchiving: boolean
    onArchive: (v: Notification) => void
}>

export const NotificationEventUpdate: React.FC<NotificationEventUpdateProps> = ({
    className,
    notification,
    isArchiving,
    onArchive
}) => {
    return (
        <NotificationCardBase
            className={className}
            isArchiving={isArchiving}
            onArchive={() => onArchive(notification)}
        >
            <div className={styles.wrapper}>
                <div className={styles.icon}>
                    <Icon
                        name={'info'}
                        view={'yellow'}
                        size={20}
                    />
                </div>
                <div className={styles.info}>
                    <p className={styles.title}>Событие было изменено</p>
                    <div>
                        <div className={styles['event-info']}>
                            <p
                                className={clsx({
                                    [styles['is-updated']]: notification.updatedField === 'date'
                                })}
                            >
                                {formatDate(notification.event.date.start)}
                            </p>
                            <span/>
                            <p
                                className={clsx({
                                    [styles['is-updated']]: notification.updatedField === 'time'
                                })}
                            >
                                {getTimeRange(notification.event.date.start, notification.event.date.end)}
                            </p>
                            {notification.event.price && (
                                <>
                                    <span/>
                                    <p
                                        className={clsx({
                                            [styles['is-updated']]: notification.updatedField === 'price'
                                        })}
                                    >
                                        {notification.event.price} ₽
                                    </p>
                                </>
                            )}
                        </div>
                        <div className={styles['event-project']}>
                            <p>{notification.event.project.name}</p>
                            {notification.event.project.subgroup && (
                                <>
                                    <span/>
                                    <p>{notification.event.project.subgroup}</p>
                                </>
                            )}
                        </div>
                        <p className={styles['event-name']}>
                            {notification.event.name}
                        </p>
                    </div>
                    <p className={styles.description}>
                        {formatTimeDifference(notification.date)}
                    </p>
                </div>
            </div>
        </NotificationCardBase>
    )
}