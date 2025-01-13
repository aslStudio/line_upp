import {TimeStamp} from "@/shared/lib";
import {NotificationType} from "@/shared/api/enum.ts";

export const projectNotificationType = [
    NotificationType.PARTICIPANT_INVITE_TO_PROJECT,
    NotificationType.PARTICIPANT_REMOVE_FROM_PROJECT,
    NotificationType.PARTICIPANT_REMOVE_PROJECT,
    NotificationType.ORGANIZER_ACCEPT_INVITATION_TO_PROJECT,
    NotificationType.ORGANIZER_REJECT_INVITATION_TO_PROJECT,
    NotificationType.ORGANIZER_LEAVE_PROJECT
] as const

export const eventNotificationType = [
    NotificationType.PARTICIPANT_CREATED_NEW_PUBLIC_EVENT,
    NotificationType.PARTICIPANT_NEED_SUBMIT_PARTICIPATION,
    NotificationType.PARTICIPANT_PARTICIPATION_REQUEST_APPROVED,
    NotificationType.PARTICIPANT_PARTICIPATION_REQUEST_REJECTED,
    NotificationType.PARTICIPANT_INVITE_TO_EVENT,
    NotificationType.PARTICIPANT_PARTICIPATION_SUBMIT_APPROVED,
    NotificationType.PARTICIPANT_EVENT_REMOVED,
    NotificationType.PARTICIPANT_REMOVED_FROM_EVENT,
    NotificationType.ORGANIZER_NEW_PARTICIPATION_REQUEST,
    NotificationType.ORGANIZER_CONFIRM_PARTICIPATION,
    NotificationType.ORGANIZER_REJECT_INVITATION,
    NotificationType.ORGANIZER_APPROVE_INVITATION,
    NotificationType.ORGANIZER_LEAVE_EVENT
] as const

export type Notification =
    NotificationBase &
    (
        ProjectNotification |
        EventNotification |
        UpdatedEventNotification |
        EventReminderNotification
    )

export type NotificationBase = {
    id: string | number
    date: TimeStamp
    isNew: boolean
}

export type ProjectNotification = {
    type: typeof projectNotificationType[number]
    user: {
        name: string
        avatar: string
    }
    project: {
        id: string | number
        name: string
    }
    /** id приглашения на участие, если принять участие */
    invitationId?: string | number
}

export type EventNotification = {
    type: typeof eventNotificationType[number]
    user: {
        name: string
        avatar: string
    }
    event: {
        date: {
            start: TimeStamp
            end: TimeStamp
        },
        price: number
        name: string
        project: {
            id: string | number
            name: string
            subgroup?: string
        }
        /** id заявки на участие, если подтвеждение участия */
        orderId?: string | number
    }
}

export type UpdatedEventNotification = {
    type: NotificationType.EVENT_WAS_UPDATED,
    event: {
        date: {
            start: TimeStamp
            end: TimeStamp
        },
        price: number
        name: string
        project: {
            id: string | number
            name: string
            subgroup?: string
        }
    }
    updatedField: 'date' | 'time' | 'price'
}

export type EventReminderNotification = {
    type: NotificationType.EVENT_REMINDER,
    event: {
        date: {
            start: TimeStamp
            end: TimeStamp
        },
        name: string
    }
}