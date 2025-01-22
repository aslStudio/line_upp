import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {notificationApi} from "@/shared/api/notification"

export type NotificationSettings = {
    /** Уведомления от приложения */
    fromApp: boolean
    /** Напоминание о событии */
    aboutEvent: boolean
    /** Пользователь подтвердил событие */
    userSubmitEvent: boolean

    /** Приглашение в расписание */
    inviteInSchedule: boolean
    /** Приглашение в событие */
    inviteInEvent: boolean
    /** Изменение в событии */
    scheduleEventChanged: boolean
    /** Отмена события */
    eventCanceled: boolean
    /** Новое открытое событие */
    newPublicEvent: boolean

    /** Новая заявка */
    newOrder: boolean
    /** Изменение в событии */
    projectEventChanged: boolean
    /** Пользователь отказался от участия */
    userRejectFromParticipation: boolean
    /** Пользователь покинул проект */
    userLeaveProject: boolean
    /** Пользователь вступил в проект */
    userJoinedProject: boolean
}

const getNotificationsSettingsThunk = createAsyncThunk(
    'entities/notification/settings/getNotificationsSettingsThunk',
    notificationApi.getNotificationsSettings
)

type InitialState = {
    isPending: boolean
    data: NotificationSettings
}

const initialState: InitialState = {
    isPending: true,
    data: {
        fromApp: false,
        aboutEvent: false,
        userSubmitEvent: false,
        inviteInSchedule: false,
        inviteInEvent: false,
        scheduleEventChanged: false,
        eventCanceled: false,
        newPublicEvent: false,
        newOrder: false,
        projectEventChanged: false,
        userRejectFromParticipation: false,
        userLeaveProject: false,
        userJoinedProject: false,
    }
}

const notificationSettingsSlice = createSlice({
    name: 'entities/notification/settings',
    initialState,
    reducers: {
        update: (
            state,
            { payload }: PayloadAction<Partial<InitialState['data']>>
        ) => {
            state.data = {
                ...state.data,
                ...payload
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getNotificationsSettingsThunk.fulfilled, (state, { payload }) => {
            if (payload.payload) {
                state.isPending = false
                state.data = {
                    ...payload.payload
                }
            }
        })
    }
})

export const notificationSettingsModel = {
    reducer: notificationSettingsSlice.reducer,
    actions: notificationSettingsSlice.actions,
    thunks: {
        getNotificationsSettingsThunk,
    }
}