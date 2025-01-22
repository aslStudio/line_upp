import {Notification} from "@/shared/kernel.ts";
import {Project, SubGroup} from "@/entities/projects/model";
import {Schedule} from "@/entities/schedule/model";
import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

export type GetNotificationsParams = {
    page: number
    type?: 'schedule' | 'project'
    project?: Project['id'][]
    subgroup?: SubGroup['id'][]
    schedule?: Schedule['id'][]
}

export type GetNotificationsResponse = {
    list: Notification[]
    lastPage: number
}

export type GetArchivedNotificationsParams = {
    page: number
    type?: 'schedule' | 'project'
    project?: Project['id'][]
    subgroup?: SubGroup['id'][]
    schedule?: Schedule['id'][]
}

export type GetArchivedNotificationsResponse = {
    list: Notification[]
    lastPage: number
}

export type ArchiveNotificationParams = {
    id: Notification['id']
}

export type ApproveParticipationParams = {
    id: Notification['id']
}

export type RejectParticipationParams = {
    id: Notification['id']
}

export type SubmitParticipationParams = {
    id: Notification['id']
}

export type SendParticipationParams = {
    id: Notification['id']
}

export type GetNotificationsSettings = {
    /** Уведомления от приложения */
    fromApp: boolean
    /** Напоминание о событии */
    aboutEvent: boolean
    /** Пользователь подтвердил событие */
    userSubmitEvent: boolean

    /** Приглашение в расписание */
    inviteInSchedule: boolean
    /** Приглашение в событие */
    inviteInEvent: boolean
    /** Изменение в событии */
    scheduleEventChanged: boolean
    /** Отмена события */
    eventCanceled: boolean
    /** Новое открытое событие */
    newPublicEvent: boolean

    /** Новая заявка */
    newOrder: boolean
    /** Изменение в событии */
    projectEventChanged: boolean
    /** Пользователь отказался от участия */
    userRejectFromParticipation: boolean
    /** Пользователь покинул проект */
    userLeaveProject: boolean
    /** Пользователь вступил в проект */
    userJoinedProject: boolean
}

export type UpdateNotificationSettingsParams = Partial<GetNotificationsSettings>

export type NotificationApi = {
    getNotifications: (p: GetNotificationsParams) =>
        Promise<ResponseDefault<GetNotificationsResponse>>
    getArchivedNotifications: (p: GetArchivedNotificationsParams) =>
        Promise<ResponseDefault<GetArchivedNotificationsResponse>>
    archiveNotification: (p: ArchiveNotificationParams) =>
        Promise<ResponseDefault>
    approveParticipation: (p: ApproveParticipationParams) =>
        Promise<ResponseDefault>
    rejectParticipation: (p: RejectParticipationParams) =>
        Promise<ResponseDefault>
    submitParticipation: (p: SubmitParticipationParams) =>
        Promise<ResponseDefault>
    sendParticipation: (p: SendParticipationParams) =>
        Promise<ResponseDefault>
    getNotificationsSettings: () =>
        Promise<ResponseDefault<GetNotificationsSettings>>
    updateNotificationSettings: (p: UpdateNotificationSettingsParams) =>
        Promise<ResponseDefault>
}