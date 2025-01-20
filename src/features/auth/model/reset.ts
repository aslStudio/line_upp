import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "@/shared/api/auth";
import {RequestState} from "@/shared/lib";

const resetPasswordThunk = createAsyncThunk(
    'features/auth/resetPasswordThunk',
    authApi.resetPassword
)
const sendCodeThunk = createAsyncThunk(
    'features/auth/reset/sendCodeThunk',
    authApi.sendCode
)
const confirmCodeThunk = createAsyncThunk(
    'features/auth/reset/confirmCodeThunk',
    authApi.confirmCode
)

const initialState: {
    sendCodeState: RequestState,
    confirmCodeState: RequestState
    resetState: RequestState

    phone: string
    password: string
    repeatPassword: string
} = {
    sendCodeState: 'idle',
    confirmCodeState: 'idle',
    resetState: 'idle',

    phone: '',
    password: '',
    repeatPassword: '',
}

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        updatePhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload
        },
        updatePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        updateRepeatPassword: (state, action: PayloadAction<string>) => {
            state.repeatPassword = action.payload
        },
        reset: state => {
            state.sendCodeState = 'idle'
            state.confirmCodeState = 'idle'
            state.resetState = 'idle'

            state.phone = ''
            state.password = ''
            state.repeatPassword = ''
        },
    },
    extraReducers: builder => {
        builder.addCase(resetPasswordThunk.pending, state => {
            state.resetState = 'pending'
        })
        builder.addCase(resetPasswordThunk.fulfilled, (state, { payload }) => {
            state.resetState = payload.error ? 'error' : 'success'
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

export const resetPasswordModel = {
    reducer: resetPasswordSlice.reducer,
    actions: resetPasswordSlice.actions,
    thunks: {
        resetPasswordThunk,
        sendCodeThunk,
        confirmCodeThunk,
    }
}