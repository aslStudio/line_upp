import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {usersApi} from "@/shared/api/users"

import { User } from './types.ts'

const getOrganizersThunk = createAsyncThunk(
    'entities/organizers/getOrganizersThunk',
    usersApi.getContacts
)

type InitialState = {
    isPending: boolean,
    searchValue: string
    data: User[]
}

const initialState: InitialState = {
    isPending: true,
    searchValue: '',
    data: []
}

const organizersSlice = createSlice({
    name: 'entities/user/organizers',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        reset: state => {
            state.data = []
        }
    },
    extraReducers: builder => {
        builder.addCase(getOrganizersThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(getOrganizersThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            if (payload.payload) {
                state.data = payload.payload
            }
        })
    }
})

export const organizersSearchModel = {
    reducer: organizersSlice.reducer,
    actions: organizersSlice.actions,
    thunks: {
        getOrganizersThunk,
    }
}