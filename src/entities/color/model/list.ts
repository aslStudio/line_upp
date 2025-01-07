import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {colorApi} from "@/shared/api/color";

export type Color = {
    id: number
    name: string
}

const getColorsThunk = createAsyncThunk(
    'entities/color/getColors',
    colorApi.getColors
)

const initialState: {
    isPending: boolean
    data: Color[]
} = {
    isPending: true,
    data: []
}

const colorListSlice = createSlice({
    name: 'entities/color/list',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getColorsThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(getColorsThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            if (!payload.error) {
                state.data = payload.payload
            }
        })
    }
})

export const colorListModel = {
    reducer: colorListSlice.reducer,
    actions: colorListSlice.actions,
    thunks: {
        getColorsThunk,
    }
}