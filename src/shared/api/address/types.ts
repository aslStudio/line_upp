import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

export type GetAddressListParams = {
    search: string
}

export type GetAddressListResponse = {
    suggestions: {
        value: string
        data: {
            country: string
            city: string
            street: string
            house: string
        }
    }[]
}

export type AddressApi = {
    getAddress: (p: GetAddressListParams) =>
        Promise<ResponseDefault<GetAddressListResponse>>
}