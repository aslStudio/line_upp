import {ResponseDefault} from "@/shared/lib/api/createRequest.ts"
import {ProjectAccessType} from "@/shared/api/enum.ts"

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
    organizers: {
        id: number
        name: string
        avatar: string
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
    access: ProjectAccessType
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
    isNeedSubmit: boolean
    organizers: (number | string)[]
    participants: (number | string)[]
    access: ProjectAccessType
}

export type UpdateProjectParams = {
    id: number | string
    name: string
    comment: string
    note: string
    isNeedSubmit: boolean
    organizers: (number | string)[]
    participants: (number | string)[]
    access: ProjectAccessType
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
}