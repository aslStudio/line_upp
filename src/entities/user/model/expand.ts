import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {usersApi} from "@/shared/api/users"
import {RequestState} from "@/shared/lib"

import {ExpandUser} from "./types"

const fetchExpandUser = createAsyncThunk(
    'entities/users/expand/fetchExpandUser',
    usersApi.getExpandUser
)
const unblockUser = createAsyncThunk(
    'entities/users/expand/unblock',
    usersApi.unblockUser,
)
const blockUser = createAsyncThunk(
    'entities/users/expand/block',
    usersApi.blockUser,
)

type InitialState = {
    isPending: boolean
    isBlocking: RequestState
    isUnblocking: RequestState
    data: ExpandUser
}

const initialState: InitialState = {
    isPending: true,
    isBlocking: 'idle',
    isUnblocking: 'idle',
    data: {
        id: '',
        phone: '',
        email: '',
        avatar: '',
        nickname: '',
        name: '',
        telegram: '',
        about: '',

        isBlocked: false,
        isShowName: false,
        isShowPhone: false,
        isShowAbout: false,
        isShowEmail: false,
        isShowTelegram: false,
    }
}

const expandUserSlice = createSlice({
    name: 'entities/users/expand',
    initialState,
    reducers: {
        reset: state => {
            state.isPending = false
            state.data = initialState.data
            state.isUnblocking = 'idle'
            state.isBlocking = 'idle'
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExpandUser.pending, state => {
            state.isPending = true
        })
        builder.addCase(fetchExpandUser.fulfilled, (state, { payload }) => {
            if (payload.payload) {
                state.data = payload.payload
                state.isPending = false
            }
        })
        builder.addCase(blockUser.pending, state => {
            state.isBlocking = 'pending'
        })
        builder.addCase(blockUser.fulfilled, (state, { payload }) => {
            state.isBlocking = payload.error ? 'error' : 'success'
        })
        builder.addCase(unblockUser.pending, state => {
            state.isUnblocking = 'pending'
        })
        builder.addCase(unblockUser.fulfilled, (state, { payload }) => {
            state.isUnblocking = payload.error ? 'error' : 'success'
        })
    }
})

export const expandUserModel = {
    reducer: expandUserSlice.reducer,
    actions: expandUserSlice.actions,
    thunks: {
        fetchExpandUser,
        blockUser,
        unblockUser,
    }
}