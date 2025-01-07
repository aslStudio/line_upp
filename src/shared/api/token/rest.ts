import { createRequest } from '@/shared/lib/api/createRequest'
import { TokenApi } from './types'

export const tokenApi: TokenApi = {
    create: async data =>
        await createRequest({
            url: 'auth/jwt/create',
            method: 'POST',
            withAuth: false,
            withPrefix: false,
            data,
        }),
    refresh: async data =>
        await createRequest({
            url: 'auth/jwt/refresh',
            method: 'POST',
            withAuth: false,
            withPrefix: false,
            data,
        })
}