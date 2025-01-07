import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {viewerApi} from "@/shared/api/viewer";
import {RequestState} from "@/shared/lib";

type Viewer = {
    id: number
}

const getViewerThunk = createAsyncThunk(
    'entities/viewer/getViewerThunk',
    viewerApi.getViewer
)

const initialState: {
    state: RequestState
    data: Viewer
} = {
    state: 'idle',
    data: {
        id: 0,
    }
}

const viewerShowSlice = createSlice({
    name: 'entities/viewer/show',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getViewerThunk.pending, state => {
            state.state = 'pending'
        })
        builder.addCase(getViewerThunk.fulfilled, (state, { payload }) => {
            if (payload.error) {
                state.state = 'error'
            } else {
                state.state = 'success'
                state.data.id = payload.payload.id
            }
        })
    }
})

export const viewerModel = {
    reducer: viewerShowSlice.reducer,
    actions: viewerShowSlice.actions,
    thunks: {
        getViewerThunk,
    }
}