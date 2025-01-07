import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {eventsApi} from "@/shared/api/events"

import { CalendarEvent } from './types.ts'
import {toDomainList} from "@/entities/events/lib";
import {setToMidnight} from "@/shared/lib/date.ts";

const fetchNearestThunk = createAsyncThunk(
    'entities/events/nearest/fetchNearestThunk',
    async () => {
        const response = await eventsApi.getNearestEvents()

        const today = setToMidnight(new Date().getTime())
        const tomorrowDate = new Date()
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        const tomorrow = setToMidnight(tomorrowDate.getTime())

        return {
            ...response,
            startDate: today,
            endDate: tomorrow
        }
    },
)

type InitialState = {
    isPending: boolean
    data: CalendarEvent[]
}

const initialState: InitialState = {
    isPending: true,
    data: []
}

const nearestSlice = createSlice({
    name: 'entities/events/nearest',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNearestThunk.pending, state => {
            state.isPending = !state.data.length
        })
        builder.addCase(fetchNearestThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            state.data = toDomainList(payload)
        })
    }
})

export const nearestListModel = {
    reducer: nearestSlice.reducer,
    actions: nearestSlice.actions,
    thunks: {
        fetchNearestThunk,
    }
}
