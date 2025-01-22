import { NotificationApi } from './types.ts'
import {delay} from "@/shared/lib/time.ts";
import {getRandomInt} from "@/shared/lib/number.ts";
import {NotificationType} from "@/shared/api/enum.ts";
import {getRandomDateLastWeek} from "@/shared/lib/date.ts";
import {eventNotificationType, Notification, projectNotificationType} from "@/shared/kernel.ts";

export const notificationApi: NotificationApi = {
    getNotifications: async ({ page }) => {
        await delay()

        return {
            error: false,
            payload: getList(page)
        }
    },
    getArchivedNotifications: async ({ page }) => {
        await delay()

        return {
            error: false,
            payload: getList(page),
        }
    },
    archiveNotification: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    approveParticipation: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    rejectParticipation: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    submitParticipation: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    sendParticipation: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    getNotificationsSettings: async () => {
        await delay()

        return {
            error: false,
            payload: {
                fromApp: !!getRandomInt(0, 1),
                aboutEvent: !!getRandomInt(0, 1),
                userSubmitEvent: !!getRandomInt(0, 1),
                inviteInSchedule: !!getRandomInt(0, 1),
                inviteInEvent: !!getRandomInt(0, 1),
                scheduleEventChanged: !!getRandomInt(0, 1),
                eventCanceled: !!getRandomInt(0, 1),
                newPublicEvent: !!getRandomInt(0, 1),
                newOrder: !!getRandomInt(0, 1),
                projectEventChanged: !!getRandomInt(0, 1),
                userRejectFromParticipation: !!getRandomInt(0, 1),
                userLeaveProject: !!getRandomInt(0, 1),
                userJoinedProject: !!getRandomInt(0, 1),
            }
        }
    },
    updateNotificationSettings: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    }
}

function getList(page: number) {
    const notifications: Notification[] = [
        createReminderNotification(),
        ...((['date', 'time', 'price'] as const).map(createUpdateEventNotification)),
        ...(projectNotificationType.map(createProjectNotification)),
        ...(eventNotificationType.map(createEventNotification)),
    ]

    const itemsPerPage = 10
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return {
        list: notifications.slice(startIndex, endIndex),
        lastPage: Math.ceil(notifications.length / itemsPerPage)
    }
}

function createProjectNotification(type: typeof projectNotificationType[number]) {
    return {
        id: getRandomInt(1, 10_000),
        date: getRandomDateLastWeek(),
        isNew: !!getRandomInt(0, 1),
        type,
        user: {
            name: `NAME ${getRandomInt(1, 10_000)}`,
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
        },
        project: {
            id: getRandomInt(1, 10_000),
            name: `PROJECT ${getRandomInt(1, 10_000)}`
        },
        invitationId: getRandomInt(1, 10_000)
    }
}

function createEventNotification(type: typeof eventNotificationType[number]) {
    return {
        id: getRandomInt(1, 10_000),
        date: getRandomDateLastWeek(),
        isNew: !!getRandomInt(0, 1),
        type,
        user: {
            name: `NAME ${getRandomInt(1, 10_000)}`,
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
        },
        event: {
            date: {
                start: getRandomDateLastWeek(),
                end: getRandomDateLastWeek(),
            },
            price: getRandomInt(1, 10_000),
            name: `EVENT ${getRandomInt(1, 10_000)}`,
            project: {
                id: getRandomInt(1, 10_000),
                name: `PROJECT ${getRandomInt(1, 10_000)}`,
                subgroup: `SUBGROUP ${getRandomInt(1, 10_000)}`,
            },
            orderId: getRandomInt(1, 10_000)
        }
    }
}

function createUpdateEventNotification(updatedField: 'date' | 'time' | 'price'): Notification {
    return {
        id: getRandomInt(1, 10_000),
        date: getRandomDateLastWeek(),
        isNew: !!getRandomInt(0, 1),
        type: NotificationType.EVENT_WAS_UPDATED,
        event: {
            date: {
                start: getRandomDateLastWeek(),
                end: getRandomDateLastWeek(),
            },
            price: getRandomInt(1, 10_000),
            name: `EVENT ${getRandomInt(1, 10_000)}`,
            project: {
                id: getRandomInt(1, 10_000),
                name: `PROJECT ${getRandomInt(1, 10_000)}`,
                subgroup: `SUBGROUP ${getRandomInt(1, 10_000)}`,
            },
        },
        updatedField,
    }
}

function createReminderNotification(): Notification {
    return {
        id: getRandomInt(1, 10_000),
        date: getRandomDateLastWeek(),
        isNew: !!getRandomInt(0, 1),
        type: NotificationType.EVENT_REMINDER,
        event: {
            date: {
                start: getRandomDateLastWeek(),
                end: getRandomDateLastWeek(),
            },
            name: `EVENT ${getRandomInt(1, 10_000)}`,
        },
    }
}