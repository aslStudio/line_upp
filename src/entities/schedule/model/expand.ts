import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {scheduleApi} from "@/shared/api/schedule"
import {Maybe} from "@/shared/lib"

import { ExpandSchedule } from './types.ts'

const fetchExpandThunk = createAsyncThunk(
    'entities/schedule/expand/fetchExpandThunk',
    scheduleApi.getExpandSchedule
)

type InitialState = {
    isPending: boolean
    schedule: Maybe<ExpandSchedule>
}

const initialState: InitialState = {
    isPending: true,
    schedule: null
}

const expandScheduleSlice = createSlice({
    name: 'entities/schedule/expand',
    initialState,
    reducers: {
        reset: state => {
            state.isPending = true
            state.schedule = null
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExpandThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(fetchExpandThunk.fulfilled, (state, { payload }) => {
            if (payload.payload) {
                state.schedule = payload.payload
                state.isPending = false
            }
        })
    }
})

export const scheduleExpandModel = {
    reducer: expandScheduleSlice.reducer,
    actions: expandScheduleSlice.actions,
    thunks: {
        fetchExpandThunk,
    }
}