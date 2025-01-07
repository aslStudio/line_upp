import {delay} from "@/shared/lib/time.ts"

import { ScheduleApi } from './types.ts'
import {getRandomInt} from "@/shared/lib/number.ts";

export const scheduleApi: ScheduleApi = {
    getSchedule: async () => {
        await delay()

        return {
            error: false,
            payload: getList(),
        }
    },
    getExpandSchedule: async ({ id }) => {
        await delay()

        return {
            error: false,
            payload: {
                id,
                name: `SCHEDULE ${id}`,
                comment: getRandomInt(0, 1) ? 'Приходите немного пораньше, лучше всего  за 10 минут до начала мероприятия' : '',
                note: getRandomInt(0, 1) ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' : '',
                organizers: Array(getRandomInt(1, 10)).fill(1).map((_, key) => ({
                    id: getRandomInt(1, 10_000),
                    name: `ORGANIZER ${key}`,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
                })),
                participants: Array(getRandomInt(1, 10)).fill(1).map((_, key) => ({
                    id: getRandomInt(1, 10_000),
                    name: `PARTICIPANT ${key}`,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
                }))
            }
        }
    },
    patchSchedule: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
    leaveSchedule: async () => {
        await delay()

        return {
            error: false,
            payload: null
        }
    },
}

function getList() {
    return Array(getRandomInt(1, 10)).fill(1).map(() => ({
        id: getRandomInt(1, 10_000),
        name: `schedule ${getRandomInt(1, 10_000)}`,
        subgroups: Array(getRandomInt(0, 5)).fill(1).map(() => ({
            id: getRandomInt(1, 10_000),
            name: `subgroup ${getRandomInt(1, 10_000)}`,
        }))
    }))
}