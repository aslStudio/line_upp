import { TokenApi } from './types.ts'
import {delay} from "@/shared/lib/time.ts";

export const tokenApi: TokenApi = {
    create: async () => {
        await delay()

        return {
            error: false,
            payload: {
                access: 'access',
                refresh: 'refresh'
            }
        }
    },
    refresh: async () => {
        await delay()

        return {
            error: false,
            payload: {
                access: 'access',
            }
        }
    }
}