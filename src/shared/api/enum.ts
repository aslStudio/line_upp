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