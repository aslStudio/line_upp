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
    getUsers: async ({ search }) => {
        await delay()

        return {
            error: false,
            payload: {
                contacts: getList(),
                global: search ? getList() : []
            }
        }
    },
    getExpandUser: async ({ id }) => {
        await delay()

        return {
            error: false,
            payload: {
                id,
                phone: '+71112223344',
                email: 'test@mail.ru',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
                nickname: 'Nickname',
                name: 'Name',
                telegram: '@telegram',
                about: 'Я Тима, люблю баскетбол, приходите!',

                isBlocked: Boolean(getRandomInt(0, 1)),
                isShowName: Boolean(getRandomInt(0, 1)),
                isShowPhone: Boolean(getRandomInt(0, 1)),
                isShowAbout: Boolean(getRandomInt(0, 1)),
                isShowEmail: Boolean(getRandomInt(0, 1)),
                isShowTelegram: Boolean(getRandomInt(0, 1)),
            }
        }
    },
    blockUser: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    },
    unblockUser: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    },
    getBlockedUsers: async () => {
        await delay()

        return {
            error: false,
            payload: getList(),
        }
    }
}

function getList() {
    return Array(getRandomInt(1, 5)).fill(1).map(() => ({
        id: getRandomInt(1, 10_000),
        name: `Name ${getRandomInt(1, 10_000)}`,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s'
    }))
}