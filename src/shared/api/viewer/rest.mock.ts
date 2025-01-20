import { delay } from "@/shared/lib/time.ts"
import { getRandomInt } from "@/shared/lib/number.ts"

import { ViewerApi } from './types'

export const viewerApi: ViewerApi = {
    getViewer: async () => {
        await delay()

        return {
            error: false,
            payload: {
                id: getRandomInt(1, 10_000),
                phone: '+79880283715',
                email: 'test',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
                nickname: 'nickname',
                name: 'name',
                telegram: '@username',
                about: 'qweqwe',
                canBeFindByNickname: true,
                needReminding: false,

                isShowName: true,
                isShowPhone: true,
                isShowAbout: true,
                isShowEmail: true,
                isShowTelegram: true,
            }
        }
    },
    patchViewer: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    },
    removeAccount: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    }
}