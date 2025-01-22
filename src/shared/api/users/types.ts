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

export type GetExpandUserParams = {
    id: number | string
}

export type GetExpandUserResponse = {
    id: number | string
    phone: string
    email: string
    avatar: string
    nickname: string
    name: string
    telegram: string
    about: string

    isBlocked: boolean
    isShowName: boolean
    isShowPhone: boolean
    isShowAbout: boolean
    isShowEmail: boolean
    isShowTelegram: boolean
}

export type BlockUserParams = {
    id: number | string
}

export type UnblockUserParams = {
    id: number | string
}

export type GetBlockedUsersResponse = {
    id: number
    name: string
    avatar: string
}[]

export type UsersApi = {
    getContacts: (p: GetContactsParams) =>
        Promise<ResponseDefault<GetContactsResponse>>
    getUsers: (p: GetUsersParams) =>
        Promise<ResponseDefault<GetUsersResponse>>
    getExpandUser: (p: GetExpandUserParams) =>
        Promise<ResponseDefault<GetExpandUserResponse>>
    blockUser: (p: BlockUserParams) =>
        Promise<ResponseDefault>
    unblockUser: (p: UnblockUserParams) =>
        Promise<ResponseDefault>
    getBlockedUsers: () =>
        Promise<ResponseDefault<GetBlockedUsersResponse>>
}