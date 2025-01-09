import {User} from "@/entities/user/model"

import {ProjectAccessType} from "@/shared/api/enum.ts"

export type SubGroup = {
    id: number | string,
    name: string
    projectId: number | string
}

export type Project = {
    id: number | string
    name: string
    subgroups: SubGroup[]
}

export type ExpandProject = {
    id: number | string
    name: string
    comment: string
    note: string
    organizers: User[]
    participants: User[]
    invited: User[]
    access: ProjectAccessType
}