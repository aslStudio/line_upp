import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {Event} from "@/entities/events/model"

import {eventsApi} from "@/shared/api/events"

const searchThunk = createAsyncThunk(
    'features/schedule/searchThunk',
    eventsApi.searchEvents
)

type InitialState = {
    searchValue: string
    isPending: boolean
    data: Event[]
}

const initialState: InitialState = {
    searchValue: '',
    isPending: false,
    data: []
}

const scheduleSearchSlice = createSlice({
    name: 'features/schedule/search',
    initialState,
    reducers: {
        setSearch: (state, { payload }: PayloadAction<string>) => {
            state.searchValue = payload
        },
        reset: state => {
            state.searchValue = ''
            state.data = []
        }
    },
    extraReducers: builder =>  {
        builder.addCase(searchThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(searchThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            if (!payload.error) {
                state.data = payload.payload
            }
        })
    }
})

export const scheduleSearchModel = {
    reducer: scheduleSearchSlice.reducer,
    actions: scheduleSearchSlice.actions,
    thunks: {
        searchThunk,
    }
}