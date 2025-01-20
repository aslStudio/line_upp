import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

export type GetContactsParams = {
    search?: string
}

export type GetContactsResponse = {
    id: number
    name: string
    avatar: string
}[]

export type GetUsersParams = {
    search?: string
}

export type GetUsersResponse = {
    contacts: {
        id: number
        name: string
        avatar: string
    }[]
    global: {
        id: number
        name: string
        avatar: string
    }[]
}

export type UsersApi = {
    getContacts: (p: GetContactsParams) =>
        Promise<ResponseDefault<GetContactsResponse>>
    getUsers: (p: GetUsersParams) =>
        Promise<ResponseDefault<GetUsersResponse>>
}