import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {Event} from "@/entities/events/model"

import {eventsApi} from "@/shared/api/events"

const searchThunk = createAsyncThunk(
    'features/project/searchThunk',
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

const projectSearchSlice = createSlice({
    name: 'features/project/search',
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

export const projectSearchModel = {
    reducer: projectSearchSlice.reducer,
    actions: projectSearchSlice.actions,
    thunks: {
        searchThunk,
    }
}