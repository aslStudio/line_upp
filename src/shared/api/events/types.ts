import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";
import {TimeStamp} from "@/shared/lib";
import {EventType, InviteLinkType, OrderStatus, RepeatType} from "@/shared/api/enum.ts";
import {Color} from "@/entities/color/model";

export type GetEventsParams = {
    isFavorite: boolean
    startDate: TimeStamp
    endDate: TimeStamp
    color: number[]
    project: number[]
    subGroup: number[]
    schedule: number[]
    eventType: EventType[]
    orderType: OrderStatus[]
}

export type GetEventsResponse = {
    date: TimeStamp
    events: {
        id: number
        project: string
        group: string
        name: string
        startTime: TimeStamp
        endTime: TimeStamp
        price: number
        participants: {
            id: number
            avatar: string
            name: string
        }[]
        isOwl: boolean
        color: string
        eventType: EventType
        orderType: OrderStatus
        isFavorite: boolean
    }[]
}[]

export type GetNearestEventsList = {
    date: TimeStamp
    events: {
        id: number
        project: string
        group: string
        name: string
        startTime: TimeStamp
        endTime: TimeStamp
        price: number
        participants: {
            id: number
            avatar: string
            name: string
        }[]
        isOwl: boolean
        color: string
        eventType: EventType
        orderType: OrderStatus
        isFavorite: boolean
    }[]
}[]

export type SearchEventsParams = {
    search: string
    isFavorite: boolean
    color: number[]
    project: number[]
    subGroup: number[]
    schedule: number[]
    eventType: EventType[]
    orderType: OrderStatus[]
}

export type SearchEventsResponse = {
    id: number
    project: string
    group: string
    name: string
    startTime: TimeStamp
    endTime: TimeStamp
    price: number
    participants: {
        id: number
        avatar: string
        name: string
    }[]
    isOwl: boolean
    color: string
    eventType: EventType
    orderType: OrderStatus
    isFavorite: boolean
}[]

export type PatchEventParams = {
    id: number
    isFavorite?: boolean
    note?: string
}

export type GetExpandEventParams = {
    id: number
}

export type GetExpandEventResponse = {
    isOrganizer: boolean

    id: number
    img: string
    eventType: EventType
    orderStatus: OrderStatus
    isFavorite: boolean
    name: string
    project: {
        id: number
        name: string
        subgroups: {
            id: number
            name: string
        }[]
    }
    subgroup: {
        id: number
        name: string
    }

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

export type SubmitOrderParams = {
    eventId: number | string
    userId: number
}

export type RejectOrderParams = {
    eventId: number | string
    userId: number
}

export type CreateEventParams = {
    type: EventType
    image: string
    name: string
    description: string
    comment: string
    isEventClosed: boolean
    isPersonalNotification: boolean
    color: number | string
    address: {
        city: string
        street: string
        house: string
        country: string
    }
    startDate: TimeStamp
    duration: TimeStamp
    isOwl: boolean
    repeat: {
        type: RepeatType
        value: number
        days: number[]
    }
    price: number
    organizers: {
        id: number
        name: string
        avatar: string
    }[]
    project: number | string
    subgroup: number | string
    participants: {
        id: number
        name: string
        avatar: string
    }[]
}

export type UpdateEventParams = {
    type: EventType
    image: string
    name: string
    description: string
    comment: string
    isEventClosed: boolean
    isPersonalNotification: boolean
    color: number | string
    address: {
        city: string
        street: string
        house: string
        country: string
    }
    startDate: TimeStamp
    duration: TimeStamp
    isOwl: boolean
    repeat: {
        type: RepeatType
        value: number
        days: number[]
    }
    price: number
    organizers: {
        id: number
        name: string
        avatar: string
    }[]
    project: number | string
    subgroup: number | string
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
    inviteLinkType: InviteLinkType,
    inviteLinkLimit: number
}

export type DeleteEventParams = {
    id: number | string
}

export type EventsApi = {
    getEvents: (params: GetEventsParams) =>
        Promise<ResponseDefault<GetEventsResponse>>
    getNearestEvents: () =>
        Promise<ResponseDefault<GetNearestEventsList>>
    searchEvents: (params: SearchEventsParams) =>
        Promise<ResponseDefault<SearchEventsResponse>>
    patchEvent: (params: PatchEventParams) =>
        Promise<ResponseDefault>
    getExpandEvent: (params: GetExpandEventParams) =>
        Promise<ResponseDefault<GetExpandEventResponse>>

    submitOrder: (params: SubmitOrderParams) =>
        Promise<ResponseDefault>
    rejectOrder: (params: RejectOrderParams) =>
        Promise<ResponseDefault>

    create: (params: CreateEventParams) => Promise<ResponseDefault>
    update: (params: UpdateEventParams) => Promise<ResponseDefault>
    delete: (params: DeleteEventParams) => Promise<ResponseDefault>
}