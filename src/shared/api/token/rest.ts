import { createRequest } from '@/shared/lib/api/createRequest'
import { TokenApi } from './types'

export const tokenApi: TokenApi = {
    create: async data =>
        await createRequest({
            url: 'profiles/token',
            method: 'POST',
            withAuth: false,
            data,
        }),
    refresh: async data =>
        await createRequest({
            url: 'profiles/token/refresh',
            method: 'POST',
            withAuth: false,
            data,
        })
}