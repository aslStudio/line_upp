import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {usersApi} from "@/shared/api/users"

import {User} from "./types.ts"

const fetchBlockedUsersThunks = createAsyncThunk(
    'entities/user/blocked/fetchBlockedUsersThunks',
    usersApi.getBlockedUsers
)

type InitialState = {
    isPending: boolean
    data: User[]
}

const initialState: InitialState = {
    isPending: false,
    data: [],
}

const blockedUsersSlice = createSlice({
    name: 'entities/user/blocked',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchBlockedUsersThunks.pending, state => {
            state.isPending = true
        })
        builder.addCase(fetchBlockedUsersThunks.fulfilled, (state, { payload }) => {
            if (!payload.error) {
                state.isPending = false
                state.data = payload.payload
            }
        })
    }
})

export const blockedUsersModel = {
    reducer: blockedUsersSlice.reducer,
    actions: blockedUsersSlice.actions,
    thunks: {
        fetchBlockedUsersThunks
    }
}