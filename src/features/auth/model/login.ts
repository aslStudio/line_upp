import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tokenModel} from "@/shared/model";

const loginThunk = createAsyncThunk(
    'features/auth/login',
    tokenModel.createTokens
)

const initialState: {
    state: 'idle' | 'loading' | 'success' | 'error'
} = {
    state: 'idle',
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        reset: state => {
            state.state = 'idle'
        }
    },
    extraReducers: builder => {
        builder.addCase(loginThunk.pending, state => {
            state.state = 'loading'
        })
        builder.addCase(loginThunk.fulfilled, (state, payload) => {
            state.state =
                payload.payload.error
                    ? 'error'
                    : 'success'
        })
    }
})

export const loginModel = {
    reducer: loginSlice.reducer,
    actions: loginSlice.actions,
    thunks: {
        loginThunk,
    }
}