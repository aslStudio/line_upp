import { AuthApi } from './types.ts'
import {createRequest} from "@/shared/lib/api/createRequest.ts";

export const authApi: AuthApi = {
    registration: async data =>
        createRequest({
            url: 'profiles/register',
            method: 'POST',
            withAuth: false,
            data,
        }),
    sendCode: async data =>
        createRequest({
            url: 'confirmation/send-code',
            method: 'POST',
            withAuth: false,
            data,
        }),
    confirmCode: async data =>
        createRequest({
            url: 'confirmation/confirm-code',
            method: 'POST',
            withAuth: false,
            data,
        }),
    resetPassword: async data =>
        createRequest({
            url: `profiles/${data.profileId}/reset-password`,
            method: 'POST',
            withAuth: true,
            data: {
                password: data.password,
            }
        })
}