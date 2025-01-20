import { UsersApi } from './types.ts'
import {delay} from "@/shared/lib/time.ts";
import {getRandomInt} from "@/shared/lib/number.ts";

export const usersApi: UsersApi = {
    getContacts: async () => {
        await delay()

        return {
            error: false,
            payload: getList(),
        }
    },
}

function getList() {
    return Array(getRandomInt(1, 5)).fill(1).map(() => ({
        id: getRandomInt(1, 10_000),
        name: `Name ${getRandomInt(1, 10_000)}`,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s'
    }))
}