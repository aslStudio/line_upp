import {User} from "@/entities/user/model"

import {InviteLinkType, ProjectAccessType, ReminderType} from "@/shared/api/enum.ts"

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
    organizers: (User & {
        isCreator: boolean
    })[]
    participants: User[]
    invited: User[]
    access: ProjectAccessType
    reminder: {
        type: ReminderType
        value: number
    }
    isNeedSubmit: boolean
    inviteLink: string
    inviteLinkType: InviteLinkType
    inviteLinkLimit: number
}