import React from "react"

import {PropsDefault} from "@/shared/lib"
import {EventReminderNotification, Notification, NotificationBase} from "@/shared/kernel.ts"

import { NotificationCardBase } from '../NotificationCardBase'

import styles from './NotificationReminder.module.scss'
import {Icon} from "@/shared/ui/Icon";
import {formatDate, formatTime, formatTimeDifference} from "@/shared/lib/date.ts";

export type NotificationReminderProps = PropsDefault<{
    notification: NotificationBase & EventReminderNotification
    isArchiving: boolean
    onArchive: (v: Notification) => void
}>

export const NotificationReminder: React.FC<NotificationReminderProps> = ({
    className,
    notification,
    isArchiving,
    onArchive,
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
                        view={'blue'}
                        size={20}
                    />
                </div>
                <div className={styles.info}>
                    <p className={styles.title}>
                        Событие
                        <span> {notification.event.name}, {formatDate(notification.event.date.start)} {formatTime(notification.event.date.start)}, </span>
                        начнётся уже через час!
                    </p>
                    <p className={styles.description}>
                        {formatTimeDifference(notification.date)}
                    </p>
                </div>
            </div>
        </NotificationCardBase>
    )
}

