import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GetNotificationsParams, notificationApi} from "@/shared/api/notification";
import {Notification} from "@/shared/kernel.ts";

const fetchListThunk = createAsyncThunk(
    'entities/notification/fetchListThunk',
    async (params: Omit<GetNotificationsParams, 'page'>) => {
        const response = await notificationApi.getNotifications({
            ...params,
            page: 1,
        })

        return {
            ...response,
            page: 1,
        }
    }
)

const fetchNextPageThunk = createAsyncThunk(
    'entities/notification/fetchNextPageThunk',
    async (params: GetNotificationsParams) => {
        const response = await notificationApi.getNotifications(params)

        return {
            ...response,
            page: params.page + 1,
        }
    }
)

type InitialState = {
    isPending: boolean
    isFetching: boolean
    page: number
    lastPage: number
    list: Notification[]
}

const initialState: InitialState = {
    isPending: true,
    isFetching: false,
    page: 1,
    lastPage: 1,
    list: []
}

const notificationListSlice = createSlice({
    name: 'entities/notification/list',
    initialState,
    reducers: {
        reset: state => {
            state.isPending = true
            state.isFetching = false
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchListThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(fetchListThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            state.page = payload.page

            if (!payload.error && payload.payload) {
                state.list = payload.payload.list
                state.lastPage = payload.payload.lastPage
            }
        })
        builder.addCase(fetchNextPageThunk.pending, state => {
            state.isFetching = true
        })
        builder.addCase(fetchNextPageThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            state.isFetching = false
            state.page = payload.page

            if (!payload.error && payload.payload) {
                state.list = [
                    ...state.list,
                    ...payload.payload.list
                ]
                state.lastPage = payload.payload.lastPage
            }
        })
    }
})

export const notificationListModel = {
    reducer: notificationListSlice.reducer,
    actions: notificationListSlice.actions,
    thunks: {
        fetchListThunk,
        fetchNextPageThunk,
    }
}