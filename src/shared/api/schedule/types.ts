import {ResponseDefault} from "@/shared/lib/api/createRequest.ts"

export type GetScheduleResponse = {
    id: number
    name: string,
    subgroups: {
        id: number,
        name: string
    }[],
}[]

export type GetExpandScheduleParams = {
    id: number | string
}

export type GetExpandScheduleResponse = {
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
}

export type PatchScheduleParams = {
    id: number | string
    note?: string
}

export type LeaveScheduleParams = {
    id: number | string
}

export type ScheduleApi = {
    getSchedule: () =>
        Promise<ResponseDefault<GetScheduleResponse>>
    getExpandSchedule: (p: GetExpandScheduleParams) =>
        Promise<ResponseDefault<GetExpandScheduleResponse>>
    patchSchedule: (p: PatchScheduleParams) =>
        Promise<ResponseDefault>
    leaveSchedule: (p: LeaveScheduleParams) =>
        Promise<ResponseDefault>
}