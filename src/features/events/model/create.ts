import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {Color} from "@/entities/color/model"
import {Address} from "@/entities/address/model"
import {User} from "@/entities/user/model"

import {EventType, InviteLinkType, RepeatType} from "@/shared/api/enum.ts"
import {Maybe, RequestState, TimeStamp} from "@/shared/lib"
import {getToday, setToMidnight} from "@/shared/lib/date.ts"
import {Project, SubGroup} from "@/entities/projects/model";
import {ExpandEvent} from "@/entities/events/model";
import {eventsApi} from "@/shared/api/events";

const createThunk = createAsyncThunk(
    'features/events/create',
    eventsApi.create
)

const updateThunk = createAsyncThunk(
    'features/events/update',
    eventsApi.update
)

const deleteThunk = createAsyncThunk(
    'features/events/delete',
    eventsApi.delete
)

type InitialState = {
    data: {
        id: Maybe<number | string>
        type: EventType
        image: string
        name: string
        description: string
        comment: string
        isEventClosed: boolean
        isPersonalNotification: boolean
        color: Maybe<Color>
        address: Address | null
        startDate: TimeStamp
        duration: TimeStamp
        isOwl: boolean
        repeat: {
            type: RepeatType
            value: number
            days: number[]
        }
        price: number
        organizers: User[]
        project: Maybe<Project>
        subgroup: Maybe<SubGroup>
        participants: User[]
        orders: User[]
        rejectedOrders: User[],
        inviteLink: string,
        inviteLinkType: InviteLinkType,
        inviteLinkLimit: number
    },
    errors: {
        name: boolean
        description: boolean
        color: boolean,
        organizers: boolean,
        participants: boolean,
        project: boolean,
    },
    creatingState: RequestState
    updatingState: RequestState
    deletingState: RequestState
}

const initialState: InitialState = {
    data: {
        id: null,
        type: EventType.PERSONAL,
        image: '',
        name: '',
        description: '',
        comment: '',
        isEventClosed: false,
        isPersonalNotification: false,
        color: null,
        address: null,
        startDate: setToMidnight(getToday()),
        duration: setToMidnight(getToday()),
        isOwl: false,
        repeat: {
            type: RepeatType.WEEK,
            value: 0,
            days: []
        },
        price: 0,
        organizers: [],
        project: null,
        subgroup: null,
        participants: [],
        orders: [],
        rejectedOrders: [],
        inviteLink: '',
        inviteLinkType: InviteLinkType.PUBLIC,
        inviteLinkLimit: 0,
    },
    errors: {
        name: false,
        description: false,
        color: false,
        organizers: false,
        participants: false,
        project: false,
    },
    creatingState: 'idle',
    updatingState: 'idle',
    deletingState: 'idle',
}

const createEventSlice = createSlice({
    name: 'features/events/create',
    initialState,
    reducers: {
        update: (state, { payload }: PayloadAction<Partial<InitialState['data']>>) => {
            state.data = {
                ...state.data,
                ...payload,
            }
            const key = Object.keys(payload)[0]
            if (key in state.errors) {
                state.errors[key as keyof InitialState['errors']] = false
            }
        },
        removeOrganizer: (state, { payload }: PayloadAction<Partial<InitialState['data']['organizers'][number]>>) => {
            state.data.organizers = state.data.organizers.filter(item => item.id !== payload.id)
        },
        removeParticipant: (state, { payload }: PayloadAction<Partial<InitialState['data']['participants'][number]>>) => {
            state.data.participants = state.data.participants.filter(item => item.id !== payload.id)
        },
        setErrors: (state, { payload }: PayloadAction<InitialState['errors']>) => {
            state.errors = payload
        },
        init: (state, { payload }: PayloadAction<ExpandEvent>) => {
            state.data = expandToDomain(payload)
        },
        reset: state => {
            state.data = initialState.data
            state.errors = {
                ...initialState.errors
            }
            state.creatingState = 'idle'
            state.updatingState = 'idle'
            state.deletingState = 'idle'
        }
    },
    extraReducers: builder => {
         builder.addCase(createThunk.pending, state => {
             state.creatingState = 'pending'
         })
        builder.addCase(createThunk.fulfilled, (state, { payload }) => {
            state.creatingState = payload.error ? 'error' : 'success'
        })
        builder.addCase(updateThunk.pending, state => {
            state.updatingState = 'pending'
        })
        builder.addCase(updateThunk.fulfilled, (state, { payload }) => {
            state.updatingState = payload.error ? 'error' : 'success'
        })
        builder.addCase(deleteThunk.pending, state => {
            state.deletingState = 'pending'
        })
        builder.addCase(deleteThunk.fulfilled, (state, { payload }) => {
            state.deletingState = payload.error ? 'error' : 'success'
        })

    }
})

export const createEventsModel = {
    reducer: createEventSlice.reducer,
    actions: createEventSlice.actions,
    thunks: {
        createThunk,
        updateThunk,
        deleteThunk,
    },
}

function expandToDomain(data: ExpandEvent): InitialState['data'] {
    return {
        id: data.id,
        type: data.eventType === EventType.OPENED ? EventType.OPENED : EventType.PERSONAL,
        image: data.img,
        name: data.name,
        description: data.about,
        comment: data.comment,
        isEventClosed: data.eventType === EventType.CLOSED,
        isPersonalNotification: data.isPersonalNotification,
        color: data.color,
        address: {
            value: '',
            ...data.address,
        },
        startDate: data.date.start,
        duration: data.date.end - data.date.start,
        isOwl: data.isOwl,
        repeat: data.repeat,
        price: data.price,
        organizers: data.organizers,
        project: data.project,
        subgroup: data.subgroup,
        participants: data.participants,
        orders: data.orders,
        rejectedOrders: data.rejectedOrders,
        inviteLink: data.inviteLink,
        inviteLinkType: data.inviteLinkType,
        inviteLinkLimit: data.inviteLinkLimit,
    }
}

export function validateEvent(data: InitialState['data']) {
    return {
        name: !data.name,
        description: !data.description,
        color: !data.color,
        organizers: !data.organizers.length,
        participants: !data.participants.length,
        project: !data.project,
    }
}

export function isError(data: InitialState['errors']) {
    return Object.values(data).reduce((prev, curr) => {
        return prev || curr
    }, false)
}