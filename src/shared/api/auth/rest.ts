import { AuthApi } from './types'
import {createRequest} from "@/shared/lib/api/createRequest.ts";

export const authApi: AuthApi = {
    registration: async data =>
        createRequest({
            url: 'auth/users',
            method: 'POST',
            withAuth: false,
            withPrefix: false,
            data,
        }),
    sendCode: async data =>
        createRequest({
            url: 'send-confirm-phone-number',
            method: 'POST',
            withAuth: false,
            data,
        }),
    confirmCode: async data =>
        createRequest({
            url: 'check-confirm-phone-number',
            method: 'POST',
            withAuth: false,
            data,
        })
}