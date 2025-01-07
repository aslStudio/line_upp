import {delay} from "@/shared/lib/time.ts"
import {TimeStamp} from "@/shared/lib"
import {getRandomInt} from "@/shared/lib/number.ts"
import {Day, EventType, InviteLinkType, OrderStatus, RepeatType} from "@/shared/api/enum.ts"
import {getToday, getTomorrow} from "@/shared/lib/date.ts"

import {EventsApi, GetEventsResponse} from './types.ts'

export const eventsApi: EventsApi = {
    getEvents: async ({ startDate, endDate, color }) => {
        await delay()

        console.log('color', color)

        return {
            error: false,
            payload: getList(
                startDate,
                endDate,
            )
        }
    },
    getNearestEvents: async () => {
        await delay()

        return {
            error: false,
            payload: getList(
                getToday(),
                getTomorrow(),
            )
        }
    },
    searchEvents: async () => {
        await delay()

        const today = new Date()

        return {
            error: false,
            payload: getEventsList(today)
        }
    },
    patchEvent: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    getExpandEvent: async ({ id }) => {
        await delay()

        return {
            error: false,
            payload: {
                isOrganizer: getIsOrganizer(),

                id,
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
                orderStatus: getOrderStatus(),
                eventType: getEventType(),
                isFavorite: getIsFavorite(),
                name: 'NAME NAME',
                project: {
                    id: 1,
                    name: 'PROJECT PROJECT',
                    subgroups: [
                        {
                            id: 2,
                            name: 'SubGroup'
                        }
                    ]
                },
                subgroup: {
                    id: 2,
                    name: 'SubGroup'
                },

                isPersonalNotification: !!getRandomInt(0, 1),
                isOwl: !!getRandomInt(0, 1),

                note: getNote(),
                about: 'about about about about about about about about about about about about about about about about about about about about about about',
                comment: 'comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment',
                color: {
                    id: 1,
                    name: 'red',
                },

                date: getDate(),
                repeat: {
                    type: getRepeatType(),
                    value: getRandomInt(1, 4),
                    days: [
                        Day.MONDAY,
                        Day.WEDNESDAY,
                        Day.SATURDAY,
                    ]
                },
                address: {
                    city: 'City',
                    street: 'Street',
                    house: '10',
                    country: 'United States',
                },
                price: getRandomInt(0, 1) ? 1_000 : 0,
                organizers: Array(getRandomInt(1, 5)).fill(1).map((_, key) => ({
                    id: key,
                    name: `Organizer ${key}`,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s'
                })),
                participants: Array(getRandomInt(1, 5)).fill(1).map((_, key) => ({
                    id: key,
                    name: `Participant ${key}`,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s'
                })),
                orders: Array(getRandomInt(1, 5)).fill(1).map((_, key) => ({
                    id: key,
                    name: `Order ${key}`,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s'
                })),
                rejectedOrders: Array(getRandomInt(1, 5)).fill(1).map((_, key) => ({
                    id: key,
                    name: `Reject order ${key}`,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s'
                })),
                inviteLink: 'https://t.me/a_study',
                inviteLinkType: InviteLinkType.PUBLIC,
                inviteLinkLimit: 0,
            },
        }
    },
    submitOrder: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    rejectOrder: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    create: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    update: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    delete: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    }
}

function getList(
    startTimestamp: TimeStamp,
    endTimestamp: TimeStamp
): GetEventsResponse {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);
    const dateArray: GetEventsResponse = [];

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push({
            date: currentDate.getTime(),
            events: getEventsList(currentDate)
        });
        // Увеличиваем дату на 1 день
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray
}

function getEventsList(day: Date) {
    const startTime = getTimestampWithTime(day.getTime(), `${getRandomInt(0, 12)}:${getRandomInt(12, 20)}`)

    return Array(getRandomInt(0, 4)).fill(1).map(() => ({
        id: getRandomInt(1, 10_000),
        project: `PROJECT ${getRandomInt(0, 5)}`,
        group: `group ${getRandomInt(0, 5)}`,
        name: `name ${getRandomInt(0, 5)}`,
        startTime,
        price: 1000,
        endTime: addHoursToTimestamp(startTime, getRandomInt(1, 3)),
        participants: Array(getRandomInt(1, 5)).fill(1).map((_, key) => ({
            id: getRandomInt(1, 10_000),
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
            name: `Participant ${key}`
        })),
        isOwl: getIsOwl(),
        color: getRandomInt(0, 1) ? 'blue' : 'green',
        eventType: getEventType(),
        orderType: getOrderStatus(),
        isFavorite: getIsFavorite()
    }))
}

function getTimestampWithTime(dateTimestamp: TimeStamp, time: string): number {
    const [hours, minutes] = time.split(':').map(Number);

    const date = new Date(dateTimestamp);

    date.setHours(hours, minutes, 0, 0);

    return date.getTime();
}

function addHoursToTimestamp(timestamp: number, hoursToAdd: number): number {
    const millisecondsInHour = 60 * 60 * 1000;

    return timestamp + hoursToAdd * millisecondsInHour;
}

function getEventType(): EventType {
    const id = getRandomInt(0, 2)

    switch (id) {
        case 0: return EventType.CLOSED
        case 1: return EventType.PERSONAL
        default: return EventType.OPENED
    }
}

function getOrderStatus(): OrderStatus {
    const id = getRandomInt(0, 7)

    switch (id) {
        case 0: return OrderStatus.THERE_ARE_ORDERS
        case 1: return OrderStatus.THERE_NOT_ORDERS
        case 2: return OrderStatus.PROCESSING
        case 3: return OrderStatus.SUBMIT_PARTICIPANT
        case 4: return OrderStatus.APPROVED
        case 5: return OrderStatus.APPROVED_SUBMIT_PARTICIPANT
        case 6: return OrderStatus.INVITED
        case 7: return OrderStatus.REJECTED
        default: return OrderStatus.APPROVED
    }
}

function getIsFavorite() {
    return Boolean(getRandomInt(0, 1))
}

function getIsOwl() {
    return Boolean(getRandomInt(0, 1))
}

function getIsOrganizer() {
    // return Boolean(getRandomInt(0, 1))
    return true
}

function getNote() {
    return getRandomInt(0, 1)
        ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'
        : ''
}

function getDate() {
    const today = new Date()
    const afterHour = new Date()
    afterHour.setHours(afterHour.getHours() + 2)

    return {
        start: today.getTime(),
        end: afterHour.getTime(),
    }
}

function getRepeatType() {
    return getRandomInt(0, 1)
        ? RepeatType.DAY
        : RepeatType.WEEK
}