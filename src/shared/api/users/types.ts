import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

export type GetContactsParams = {
    search?: string
}

export type GetContactsResponse = {
    id: number
    name: string
    avatar: string
}[]

export type UsersApi = {
    getContacts: (p: GetContactsParams) =>
        Promise<ResponseDefault<GetContactsResponse>>
}