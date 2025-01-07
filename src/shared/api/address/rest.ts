import {ENV} from "@/env.ts"

import {createRequest} from "@/shared/lib/api/createRequest.ts"

import { AddressApi } from './types.ts'

export const addressApi: AddressApi = {
    getAddress: ({ search }) =>
        createRequest({
            url: 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
            method: 'POST',
            headers: {
                Authorization: `Token ${ENV.APP_DADATA_API_KEY}`
            },
            withAuth: false,
            withBaseUrl: false,
            data: {
                query: search
            }
        })
}