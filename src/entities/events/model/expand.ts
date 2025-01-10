import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {eventsApi} from "@/shared/api/events"
import {Maybe} from "@/shared/lib"
import {GetExpandEventResponse} from "@/shared/api/events/types.ts"
import {ResponseDefault} from "@/shared/lib/api/createRequest.ts"

import { ExpandEvent } from './types.ts'

const fetchExpandThunk = createAsyncThunk(
    'entities/events/expand/fetchExpandThunk',
    eventsApi.getExpandEvent
)

type InitialState = {
    isPending: boolean
    event: Maybe<ExpandEvent>
}

const initialState: InitialState = {
    isPending: true,
    event: null
}

const expandSlice = createSlice({
    name: 'entities/events/expand',
    initialState,
    reducers: {
        submitOrder: (state, { payload }: PayloadAction<{userId: number | string}>) => {
            if (state.event){
                const user = state.event.orders.find(item => item.id === payload.userId)
                if (user) {
                    state.event.participants.push(user)
                    state.event.orders = state.event.orders.filter(item => item.id !== payload.userId)
                }
            }
        },
        rejectOrder: (state, { payload }: PayloadAction<{userId: number | string}>) => {
            if (state.event){
                const user = state.event.orders.find(item => item.id === payload.userId)
                if (user) {
                    state.event.rejectedOrders.push(user)
                    state.event.orders = state.event.orders.filter(item => item.id !== payload.userId)
                }
            }
        },
        reset: state => {
            state.isPending = true
            state.event = null
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExpandThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(fetchExpandThunk.fulfilled, (state, { payload }) => {
            if (payload.payload) {
                state.event = toDomain(payload)
                state.isPending = false
            }
        })
    }
})

export const expandModel = {
    reducer: expandSlice.reducer,
    actions: expandSlice.actions,
    thunks: {
        fetchExpandThunk,
    }
}

function toDomain(data: ResponseDefault<GetExpandEventResponse>): ExpandEvent {
    return {
        ...data.payload!,
        project: {
            ...data.payload!.project,
            subgroups: data.payload!.project.subgroups.map(item => ({
                ...item,
                projectId: data.payload!.project.id
            }))
        },
        subgroup: {
            ...data.payload!.subgroup,
            projectId: data.payload!.project.id
        }
    }
}