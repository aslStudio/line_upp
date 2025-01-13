import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"
import {Notification, NotificationBase, ProjectNotification, projectNotificationType} from "@/shared/kernel.ts"
import {NotificationType} from "@/shared/api/enum.ts"
import {formatTimeDifference} from "@/shared/lib/date.ts"

import {NotificationCardBase} from "../NotificationCardBase"

import styles from './NotificationProject.module.scss'

export type NotificationProjectProps = PropsDefault<{
    notification: NotificationBase & ProjectNotification
    isArchiving: boolean
    onArchive: (v: Notification) => void
    onSubmit: (v: Notification) => void
    onReject: (v: Notification) => void
}>

const textMap: Record<
    typeof projectNotificationType[number],
    string
> = {
    [NotificationType.PARTICIPANT_INVITE_TO_PROJECT]: 'пригласил вас в расписание',
    [NotificationType.PARTICIPANT_REMOVE_FROM_PROJECT]: 'удалил вас из расписания',
    [NotificationType.PARTICIPANT_REMOVE_PROJECT]: 'удалил расписание',
    [NotificationType.ORGANIZER_ACCEPT_INVITATION_TO_PROJECT]: 'принял ваше приглашение',
    [NotificationType.ORGANIZER_REJECT_INVITATION_TO_PROJECT]: 'отклонил ваше приглашение',
    [NotificationType.ORGANIZER_LEAVE_PROJECT]: 'покинул проект'
}

const titleView: Record<
    typeof projectNotificationType[number],
    'brand' | 'critical'
> = {
    [NotificationType.PARTICIPANT_INVITE_TO_PROJECT]: 'brand',
    [NotificationType.PARTICIPANT_REMOVE_FROM_PROJECT]: 'critical',
    [NotificationType.PARTICIPANT_REMOVE_PROJECT]: 'critical',
    [NotificationType.ORGANIZER_ACCEPT_INVITATION_TO_PROJECT]: 'brand',
    [NotificationType.ORGANIZER_REJECT_INVITATION_TO_PROJECT]: 'critical',
    [NotificationType.ORGANIZER_LEAVE_PROJECT]: 'critical'
}

export const NotificationProject: React.FC<NotificationProjectProps> = ({
    className,
    notification,

    isArchiving,

    onArchive,
    onReject,
    onSubmit
}) => {
    return (
        <NotificationCardBase
            className={className}
            isArchiving={isArchiving}
            onArchive={() => onArchive(notification)}
        >
            <div>
                <div className={styles.wrapper}>
                    <div className={styles.avatar}>
                        <img
                            src={notification.user.avatar}
                            alt={'avatar'}
                        />
                    </div>
                    <div className={styles.info}>
                        <p
                            className={clsx(
                                styles.title,
                                styles[`view_${titleView[notification.type]}`]
                            )}
                        >
                            <span>{notification.user.name}</span> {textMap[notification.type]} <span>{notification.project.name}</span>
                        </p>
                        <p className={styles.description}>
                            {formatTimeDifference(notification.date)}
                        </p>
                    </div>
                </div>
                {notification.type === NotificationType.PARTICIPANT_INVITE_TO_PROJECT && (
                    <div className={styles.buttons}>
                        <button
                            onClick={() => {
                                onSubmit(notification)
                            }}
                        >
                            Принять
                        </button>
                        <button
                            onClick={() => {
                                onReject(notification)
                            }}
                        >
                            Отклонить
                        </button>
                    </div>
                )}
            </div>
        </NotificationCardBase>
    )
}