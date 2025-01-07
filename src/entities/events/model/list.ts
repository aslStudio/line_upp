import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {toDomainList} from "@/entities/events/lib"

import {TimeStamp} from "@/shared/lib"
import {eventsApi} from "@/shared/api/events"
import {GetEventsParams} from "@/shared/api/events/types.ts"
import {addDaysToTimestamp, setToMidnight} from "@/shared/lib/date.ts"

import { CalendarEvent } from './types.ts'

export const PERIOD_LENGTH = 60

const fetchFirstPeriodThunk = createAsyncThunk(
    'entities/events/fetchThunk',
    async (params: Omit<GetEventsParams, 'startDate' | 'endDate'>) => {
        const startDate = setToMidnight(new Date().getTime())
        const endDate = addDaysToTimestamp(startDate, PERIOD_LENGTH)

        const response = await eventsApi.getEvents({
            startDate,
            endDate,
            ...params,
        })

        return {
            ...response,
            startDate,
            endDate,
        }
    }
)

const fetchNextPeriodThunk = createAsyncThunk(
    'entities/events/fetchNextPage',
    async ({ startDate, endDate, ...params }: GetEventsParams) => {
        const response = await eventsApi.getEvents({
            startDate,
            endDate,
            ...params
        })

        return {
            ...response,
            startDate,
            endDate,
        }
    },
)

type InitialState = {
    data: CalendarEvent[]
    startDate: TimeStamp
    endDate: TimeStamp

    isPending: boolean
    isFetching: boolean
}

const initialState: InitialState = {
    data: [],
    startDate: 0,
    endDate: 0,

    isPending: true,
    isFetching: false,
}

const eventsListSlice = createSlice({
    name: 'entities/events/list',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchFirstPeriodThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(fetchFirstPeriodThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            state.data = toDomainList(payload)
            state.startDate = payload.startDate
            state.endDate = payload.endDate
        })
        builder.addCase(fetchNextPeriodThunk.pending, state => {
            state.isFetching = true
        })
        builder.addCase(fetchNextPeriodThunk.fulfilled, (state, { payload }) => {
            state.isFetching = false
            state.data = [
                ...state.data,
                ...toDomainList(payload)
            ]
            state.startDate = payload.startDate
            state.endDate = payload.endDate
        })
    }
})

export const eventsListModel = {
    reducer: eventsListSlice.reducer,
    actions: eventsListSlice.actions,
    thunks: {
        fetchFirstPeriodThunk,
        fetchNextPeriodThunk,
    }
}