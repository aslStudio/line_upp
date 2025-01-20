import { AuthApi } from './types.ts'
import {delay} from "@/shared/lib/time.ts";

export const authApi: AuthApi = {
    registration: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    },
    sendCode: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    },
    confirmCode: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    },
    resetPassword: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    }
}