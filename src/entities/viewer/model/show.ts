import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import { viewerApi } from "@/shared/api/viewer"
import { RequestState } from "@/shared/lib"

import { ExpandViewer } from './types'

const getViewerThunk = createAsyncThunk(
    'entities/viewer/getViewerThunk',
    viewerApi.getViewer
)

const initialState: {
    state: RequestState
    data: ExpandViewer
} = {
    state: 'idle',
    data: {
        id: '',
        phone: '',
        email: '',
        avatar: '',
        nickname: '',
        name: '',
        telegram: '',
        about: '',
        canBeFindByNickname: false,
        needReminding: false,

        isShowName: false,
        isShowPhone: false,
        isShowAbout: false,
        isShowEmail: false,
        isShowTelegram: false,
    }
}

const viewerShowSlice = createSlice({
    name: 'entities/viewer/show',
    initialState,
    reducers: {
        update: (state, { payload }: PayloadAction<Partial<ExpandViewer>>) => {
            state.data = {
                ...state.data,
                ...payload,
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getViewerThunk.pending, state => {
            state.state = 'pending'
        })
        builder.addCase(getViewerThunk.fulfilled, (state, { payload }) => {
            if (payload.error) {
                state.state = 'error'
            } else {
                state.state = 'success'
                state.data = payload.payload
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