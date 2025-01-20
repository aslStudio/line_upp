import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {usersApi} from "@/shared/api/users"

import { User } from './types.ts'

const getParticipantsThunk = createAsyncThunk(
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

const participantsSlice = createSlice({
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
        builder.addCase(getParticipantsThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(getParticipantsThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            if (payload.payload) {
                state.data = payload.payload
            }
        })
    }
})

export const participantsSearchModel = {
    reducer: participantsSlice.reducer,
    actions: participantsSlice.actions,
    thunks: {
        getParticipantsThunk,
    }
}