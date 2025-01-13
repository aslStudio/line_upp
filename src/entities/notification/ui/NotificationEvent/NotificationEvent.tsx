import React from "react"
import {clsx} from "clsx"

import {formatDate, formatTimeDifference, getTimeRange} from "@/shared/lib/date.ts"
import {PropsDefault} from "@/shared/lib"
import {EventNotification, eventNotificationType, Notification, NotificationBase} from "@/shared/kernel.ts"
import {NotificationType} from "@/shared/api/enum.ts"

import { NotificationCardBase } from '../NotificationCardBase'

import styles from "./NotificationEvent.module.scss"

export type NotificationEventProps = PropsDefault<{
    notification: NotificationBase & EventNotification
    isArchiving: boolean
    onArchive: (v: Notification) => void
    onSubmit: (v: Notification) => void
    onReject: (v: Notification) => void
}>

const textMap: Record<
    typeof eventNotificationType[number],
    string
> = {
    [NotificationType.PARTICIPANT_CREATED_NEW_PUBLIC_EVENT]: '{user.name} <span>создал новое открытое событие</span>',
    [NotificationType.PARTICIPANT_NEED_SUBMIT_PARTICIPATION]: 'Подтвердите своё участие',
    [NotificationType.PARTICIPANT_PARTICIPATION_REQUEST_APPROVED]: '{user.name} <span>одобрил вашу заявку</span>',
    [NotificationType.PARTICIPANT_PARTICIPATION_REQUEST_REJECTED]: '{user.name} <span>отклонил вашу заявку</span>',
    [NotificationType.PARTICIPANT_INVITE_TO_EVENT]: '{user.name} <span>пригласил вас в событие</span>',
    [NotificationType.PARTICIPANT_PARTICIPATION_SUBMIT_APPROVED]: '{user.name} <span>подтвердил ваше участие</span> в событии',
    [NotificationType.PARTICIPANT_EVENT_REMOVED]: '{user.name} <span>удалил событие</span>',
    [NotificationType.PARTICIPANT_REMOVED_FROM_EVENT]: '{user.name} <span>удалил вас из события</span>',
    [NotificationType.ORGANIZER_NEW_PARTICIPATION_REQUEST]: '<span>Новая заявка</span> от пользователя {user.name}',
    [NotificationType.ORGANIZER_CONFIRM_PARTICIPATION]: '{user.name} <span>подтвердил участие</span> в событии',
    [NotificationType.ORGANIZER_REJECT_INVITATION]: '{user.name} <span>отклонил ваше приглашение</span> в событие',
    [NotificationType.ORGANIZER_APPROVE_INVITATION]: '{user.name} <span>принял ваше приглашение</span> в событие',
    [NotificationType.ORGANIZER_LEAVE_EVENT]: '{user.name} <span>вышел из события</span>'
}

const titleView: Record<
    typeof eventNotificationType[number],
    'brand' | 'critical'
> = {
    [NotificationType.PARTICIPANT_CREATED_NEW_PUBLIC_EVENT]: 'brand',
    [NotificationType.PARTICIPANT_NEED_SUBMIT_PARTICIPATION]: 'brand',
    [NotificationType.PARTICIPANT_PARTICIPATION_REQUEST_APPROVED]: 'brand',
    [NotificationType.PARTICIPANT_PARTICIPATION_REQUEST_REJECTED]: 'critical',
    [NotificationType.PARTICIPANT_INVITE_TO_EVENT]: 'brand',
    [NotificationType.PARTICIPANT_PARTICIPATION_SUBMIT_APPROVED]: 'brand',
    [NotificationType.PARTICIPANT_EVENT_REMOVED]: 'critical',
    [NotificationType.PARTICIPANT_REMOVED_FROM_EVENT]: 'critical',
    [NotificationType.ORGANIZER_NEW_PARTICIPATION_REQUEST]: 'brand',
    [NotificationType.ORGANIZER_CONFIRM_PARTICIPATION]: 'brand',
    [NotificationType.ORGANIZER_REJECT_INVITATION]: 'critical',
    [NotificationType.ORGANIZER_APPROVE_INVITATION]: 'brand',
    [NotificationType.ORGANIZER_LEAVE_EVENT]: 'brand'
}

const buttonTextMap: Record<
    typeof singleButton[number],
    string
> = {
    [NotificationType.PARTICIPANT_CREATED_NEW_PUBLIC_EVENT]: 'Отправить заявку',
    [NotificationType.PARTICIPANT_NEED_SUBMIT_PARTICIPATION]: 'Подтвердить участие',
    [NotificationType.PARTICIPANT_PARTICIPATION_REQUEST_APPROVED]: 'Подтвердить участие',
}

const twoButtons = [
    NotificationType.ORGANIZER_NEW_PARTICIPATION_REQUEST,
    NotificationType.PARTICIPANT_INVITE_TO_EVENT,
]

const singleButton = [
    NotificationType.PARTICIPANT_CREATED_NEW_PUBLIC_EVENT,
    NotificationType.PARTICIPANT_NEED_SUBMIT_PARTICIPATION,
    NotificationType.PARTICIPANT_PARTICIPATION_REQUEST_APPROVED,
] as const

export const NotificationEvent: React.FC<NotificationEventProps> = ({
    className,
    notification,

    isArchiving,

    onArchive,
    onSubmit,
    onReject
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
                            dangerouslySetInnerHTML={{
                                __html: textMap[notification.type]
                                    .replace('{user.name}', notification.user.name)
                            }}
                        />
                        <div>
                            <div className={styles['event-info']}>
                                <p>{formatDate(notification.event.date.start)}</p>
                                <span/>
                                <p>{getTimeRange(notification.event.date.start, notification.event.date.end)}</p>
                                {notification.event.price && (
                                    <>
                                        <span/>
                                        <p>{notification.event.price} ₽</p>
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
                {twoButtons.includes(notification.type) && (
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
                {singleButton.includes(notification.type as typeof singleButton[number]) && (
                    <button className={styles.button}>
                        {buttonTextMap[notification.type as typeof singleButton[number]]}
                    </button>
                )}
            </div>
        </NotificationCardBase>
    )
}
