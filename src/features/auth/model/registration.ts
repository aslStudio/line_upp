import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {authApi} from "@/shared/api/auth"
import {RequestState} from "@/shared/lib"

const registrationThunk = createAsyncThunk(
    'features/auth/registrationThunk',
    authApi.registration
)
const sendCodeThunk = createAsyncThunk(
    'features/auth/sendCodeThunk',
    authApi.sendCode
)
const confirmCodeThunk = createAsyncThunk(
    'features/auth/confirmCodeThunk',
    authApi.confirmCode
)

const initialState: {
    sendCodeState: RequestState,
    confirmCodeState: RequestState
    registrationState: RequestState

    phone: string
    password: string
    nickname: string
} = {
    sendCodeState: 'idle',
    confirmCodeState: 'idle',
    registrationState: 'idle',

    phone: '',
    password: '',
    nickname: '',
}

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        updatePhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload
        },
        updatePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        updateNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload
        },
        reset: state => {
            state.sendCodeState = 'idle'
            state.confirmCodeState = 'idle'
            state.registrationState = 'idle'

            state.phone = ''
            state.password = ''
            state.nickname = ''
        },
    },
    extraReducers: builder => {
        builder.addCase(registrationThunk.pending, state => {
            state.registrationState = 'pending'
        })
        builder.addCase(registrationThunk.fulfilled, (state, { payload }) => {
            state.registrationState = payload.error ? 'error' : 'success'
        })
        builder.addCase(sendCodeThunk.pending, state => {
            state.sendCodeState = 'pending'
        })
        builder.addCase(sendCodeThunk.fulfilled, (state, { payload }) => {
            state.sendCodeState = payload.error ? 'error' : 'success'
        })
        builder.addCase(confirmCodeThunk.pending, state => {
            state.confirmCodeState = 'pending'
        })
        builder.addCase(confirmCodeThunk.fulfilled, (state, { payload }) => {
            state.confirmCodeState = payload.error ? 'error' : 'success'
        })
    }
})

export const registrationModel = {
    reducer: registrationSlice.reducer,
    actions: registrationSlice.actions,
    thunks: {
        registrationThunk,
        sendCodeThunk,
        confirmCodeThunk,
    }
}