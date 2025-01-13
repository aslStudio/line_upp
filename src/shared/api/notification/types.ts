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
}