import {ResponseDefault} from "@/shared/lib/api/createRequest.ts"
import {InviteLinkType, ProjectAccessType, ReminderType} from "@/shared/api/enum.ts"

export type GetProjectsResponse = {
    id: number
    name: string,
    subgroups: {
        id: number,
        name: string
    }[],
}[]

export type GetProjectExpandParams = {
    id: number | string
}

export type GetProjectExpandResponse = {
    id: number | string
    name: string
    comment: string
    note: string
    reminder: {
        type: ReminderType
        value: number
    }
    organizers: {
        id: number
        name: string
        avatar: string
        isCreator: boolean
    }[]
    participants: {
        id: number
        name: string
        avatar: string
    }[]
    invited: {
        id: number
        name: string
        avatar: string
    }[]
    isNeedSubmit: boolean
    access: ProjectAccessType
    inviteLink: string
    inviteLinkType: InviteLinkType
    inviteLinkLimit: number
}

export type PatchProjectParams = {
    id: number | string
    note?: string
}

export type RemoveProjectParams = {
    id: number | string
}

export type CreateProjectParams = {
    name: string
    comment: string
    note: string
    reminder: {
        type: ReminderType
        value: number
    }
    isNeedSubmit: boolean
    organizers: {
        id: number | string
        isCreator: boolean
    }[]
    participants: (number | string)[]
    access: ProjectAccessType
    inviteLinkType: InviteLinkType
}

export type UpdateProjectParams = {
    id: number | string
    name: string
    comment: string
    note: string
    reminder: {
        type: ReminderType
        value: number
    }
    isNeedSubmit: boolean
    organizers: {
        id: number | string
        isCreator: boolean
    }[]
    participants: (number | string)[]
    invited: (number | string)[]
    access: ProjectAccessType
    inviteLinkType: InviteLinkType
}

export type ProjectsApi = {
    getProjectsList: () =>
        Promise<ResponseDefault<GetProjectsResponse>>
    getExpandProject: (p: GetProjectExpandParams) =>
        Promise<ResponseDefault<GetProjectExpandResponse>>
    patchProject: (p: PatchProjectParams) =>
        Promise<ResponseDefault>
    remove: (p: RemoveProjectParams) =>
        Promise<ResponseDefault>
    create: (p: CreateProjectParams) =>
        Promise<ResponseDefault>
    update: (p: UpdateProjectParams) =>
        Promise<ResponseDefault>
}