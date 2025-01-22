import {NotificationSettings} from "@/entities/notification/model"

export const notificationsSettingsLabelMap: Record<
    keyof NotificationSettings,
    string
> = {
    fromApp: 'Уведомления от приложения',
    aboutEvent: 'Напоминание о событии',
    userSubmitEvent: 'Пользователь подтвердил событие',

    inviteInSchedule: 'Приглашение в расписание',
    inviteInEvent: 'Приглашение в событие',
    scheduleEventChanged: 'Изменение в событии',
    eventCanceled: 'Отмена события',
    newPublicEvent: 'Новое открытое событие',

    newOrder: 'Новая заявка',
    projectEventChanged: 'Изменение в событии',
    userRejectFromParticipation: 'Пользователь отказался от участия',
    userLeaveProject: 'Пользователь покинул проект',
    userJoinedProject: 'Пользователь вступил в проект'
}

export const notificationSettingsSections: {
    title: string
    data: (keyof NotificationSettings)[]
}[] = [
    {
        title: 'Общее',
        data: [
            'fromApp',
            'aboutEvent',
            'userSubmitEvent',
        ]
    },
    {
        title: 'Для расписания',
        data: [
            'inviteInSchedule',
            'inviteInEvent',
            'scheduleEventChanged',
            'eventCanceled',
            'newPublicEvent',
        ]
    },
    {
        title: 'Для проекта',
        data: [
            'newOrder',
            'projectEventChanged',
            'userRejectFromParticipation',
            'userLeaveProject',
            'userJoinedProject',
        ]
    }
]