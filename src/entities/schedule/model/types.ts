import {User} from "@/entities/user/model"

export type ExpandSchedule = {
    id: number | string
    name: string
    comment: string
    note: string
    organizers: User[]
    participants: User[]
}