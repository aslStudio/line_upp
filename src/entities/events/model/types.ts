import {TimeStamp} from "@/shared/lib"
import {EventType, InviteLinkType, OrderStatus, RepeatType} from "@/shared/api/enum.ts"
import {Project, SubGroup} from "@/entities/projects/model";
import {Color} from "@/entities/color/model";

export type Event = {
    id: number
    project: string
    group: string
    name: string
    price: number
    startTime: TimeStamp
    endTime: TimeStamp
    participants: {
        id: number
        avatar: string
        name: string
    }[]
    color: string
    eventType: EventType
    orderType: OrderStatus
    isFavorite: boolean
    isOwl: boolean
}

export type ExpandEvent = {
    isOrganizer: boolean

    id: number
    img: string
    eventType: EventType
    orderStatus: OrderStatus
    isFavorite: boolean
    name: string
    project: Project
    subgroup: SubGroup

    isPersonalNotification: boolean
    isOwl: boolean

    note: string
    about: string
    comment: string
    color: Color

    date: {
        start: TimeStamp
        end: TimeStamp
    }
    repeat: {
        type: RepeatType
        value: number
        days: number[]
    }
    address: {
        city: string
        street: string
        house: string
        country: string
    }

    price: number
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
    orders: {
        id: number
        name: string
        avatar: string
    }[]
    rejectedOrders: {
        id: number
        name: string
        avatar: string
    }[]
    inviteLink: string
    inviteLinkType: InviteLinkType
    inviteLinkLimit: number
}

export type CalendarEvent = {
    date: TimeStamp
    events: Event[]
}