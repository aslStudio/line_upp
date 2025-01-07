import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {scheduleApi} from "@/shared/api/schedule"
import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";
import {GetScheduleResponse} from "@/shared/api/schedule/types.ts";

export type Schedule = {
    id: number | string
    name: string
    subgroups: {
        id: number
        name: string
    }[]
}

const getScheduleThunk = createAsyncThunk(
    'entities/schedule/getScheduleThunk',
    scheduleApi.getSchedule
)

const initialState: {
    isPending: boolean,
    data: Schedule[]
} = {
    isPending: true,
    data: []
}

const scheduleListSlice = createSlice({
    name: 'entities/schedule/list',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getScheduleThunk.pending, state => {
            if (state.data.length === 0) {
                state.isPending = true
            }
        })
        builder.addCase(getScheduleThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            if (!payload.error) {
                state.data = toDomain(payload)
            }
        })
    }
})

export const scheduleListModel = {
    reducer: scheduleListSlice.reducer,
    actions: scheduleListSlice.actions,
    thunks: {
        getScheduleThunk,
    }
}

function toDomain(data: ResponseDefault<GetScheduleResponse>): Schedule[] {
    if (!data.error) {
        return data.payload.map(item => ({
            id: item.id,
            name: item.name,
            subgroups: item.subgroups,
        }))
    }

    return []
}