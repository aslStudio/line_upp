export enum EventType {
    CLOSED,
    PERSONAL,
    OPENED
}

export enum OrderStatus {
    THERE_ARE_ORDERS, // Есть заявки
    THERE_NOT_ORDERS, // Нет заявок
    PROCESSING, // Заявка на рассмотрении
    SUBMIT_PARTICIPANT, // Заявка принята + Подтвердите участие
    APPROVED, // Вы участник
    APPROVED_SUBMIT_PARTICIPANT, // Вы участник + Подтвердите участие
    INVITED, // Вы приглашены
    REJECTED // Заявка отклонена
}

export enum RepeatType {
    DAY,
    WEEK,
}

export enum Day {
    SUNDAY = 0,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}

export enum InviteLinkType {
    PUBLIC,
    LIMITED,
}

export enum ProjectAccessType {
    PUBLIC,
    PERSONAL,
}

export enum ReminderType {
    MINUTES,
    HOUR,
}

export enum NotificationType {
    // Участник расписание
    /** пригласил вас в расписание */
    PARTICIPANT_INVITE_TO_PROJECT = 'PARTICIPANT_INVITE_TO_PROJECT',
    /** удалил вас из расписания */
    PARTICIPANT_REMOVE_FROM_PROJECT = 'PARTICIPANT_REMOVE_FROM_PROJECT',
    /** удалил расписание */
    PARTICIPANT_REMOVE_PROJECT = 'PARTICIPANT_REMOVE_PROJECT',

    // Организатор проект
    /** принял ваше приглашение */
    ORGANIZER_ACCEPT_INVITATION_TO_PROJECT = 'ORGANIZER_ACCEPT_INVITATION_TO_PROJECT',
    /** отклонил ваше приглашение */
    ORGANIZER_REJECT_INVITATION_TO_PROJECT = 'ORGANIZER_REJECT_INVITATION_TO_PROJECT',
    /** покинул проект */
    ORGANIZER_LEAVE_PROJECT = 'ORGANIZER_LEAVE_PROJECT',

    // Участник событие
    /** создал новое открытое событие */
    PARTICIPANT_CREATED_NEW_PUBLIC_EVENT = 'PARTICIPANT_CREATED_NEW_PUBLIC_EVENT',
    /** подтвердите своё участие */
    PARTICIPANT_NEED_SUBMIT_PARTICIPATION = 'PARTICIPANT_NEED_SUBMIT_PARTICIPATION',
    /** одобрил вашу заявку */
    PARTICIPANT_PARTICIPATION_REQUEST_APPROVED = 'PARTICIPANT_PARTICIPATION_REQUEST_APPROVED',
    /** отклонил вашу заявку */
    PARTICIPANT_PARTICIPATION_REQUEST_REJECTED = 'PARTICIPANT_PARTICIPATION_REQUEST_REJECTED',
    /** пригласил вас в событие */
    PARTICIPANT_INVITE_TO_EVENT = 'PARTICIPANT_INVITE_TO_EVENT',
    /** подтвердил ваше участие */
    PARTICIPANT_PARTICIPATION_SUBMIT_APPROVED = 'PARTICIPANT_PARTICIPATION_SUBMIT_APPROVED',
    /** удалил событие */
    PARTICIPANT_EVENT_REMOVED = 'PARTICIPANT_EVENT_REMOVED',
    /** удалил вас из события */
    PARTICIPANT_REMOVED_FROM_EVENT = 'PARTICIPANT_REMOVED_FROM_EVENT',

    // Организатор событие
    /** Новая заявка от пользователя */
    ORGANIZER_NEW_PARTICIPATION_REQUEST = 'ORGANIZER_NEW_PARTICIPATION_REQUEST',
    /** подтвердил участие */
    ORGANIZER_CONFIRM_PARTICIPATION = 'ORGANIZER_CONFIRM_PARTICIPATION',
    /** отклонил ваше приглашение */
    ORGANIZER_REJECT_INVITATION = 'ORGANIZER_REJECT_INVITATION',
    /** принял ваше приглашение */
    ORGANIZER_APPROVE_INVITATION = 'ORGANIZER_APPROVE_INVITATION',
    /** вышел из события */
    ORGANIZER_LEAVE_EVENT = 'ORGANIZER_LEAVE_EVENT',

    // Изменение
    /** изменение события */
    EVENT_WAS_UPDATED = 'EVENT_WAS_UPDATED',

    // Напоминание
    /** напоминание о начале событие */
    EVENT_REMINDER = 'EVENT_REMINDER',
}
