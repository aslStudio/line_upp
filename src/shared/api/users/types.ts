import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

export type GetOrganizersParams = {
    search?: string
}

export type GetOrganizersResponse = {
    id: number
    name: string
    avatar: string
}[]

export type GetParticipantsParams = {
    search?: string
}

export type GetParticipantsResponse = {
    id: number
    name: string
    avatar: string
}[]

export type UsersApi = {
    getOrganizers: (p: GetOrganizersParams) =>
        Promise<ResponseDefault<GetOrganizersResponse>>
    getParticipants: (p: GetParticipantsParams) =>
        Promise<ResponseDefault<GetParticipantsResponse>>
}