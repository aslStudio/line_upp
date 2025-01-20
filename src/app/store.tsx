import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import {loginModel, registrationModel, resetPasswordModel} from "@/features/auth/model"
import {eventsFiltersModel, eventsSearchModel, createEventsModel} from "@/features/events/model"
import {scheduleFiltersModel, scheduleSearchModel} from "@/features/schedule/model"
import {createProjectModel, projectFiltersModel, projectSearchModel} from "@/features/project/model"
import {notificationFilterModel} from "@/features/notification/model"

import {colorListModel} from "@/entities/color/model"
import {eventsListModel, expandModel, nearestListModel} from "@/entities/events/model"
import {projectExpandModel, projectsListModel} from "@/entities/projects/model"
import {viewerModel} from "@/entities/viewer/model"
import {scheduleExpandModel, scheduleListModel} from "@/entities/schedule/model"
import {searchAddressModel} from "@/entities/address/model"
import {organizersSearchModel, participantsSearchModel} from "@/entities/user/model"
import {notificationArchiveModel, notificationListModel} from "@/entities/notification/model";

const store = configureStore({
    reducer: {
        // features
        login: loginModel.reducer,
        registration: registrationModel.reducer,
        resetPassword: resetPasswordModel.reducer,

        eventsFilters: eventsFiltersModel.reducer,
        eventsSearch: eventsSearchModel.reducer,
        createEvent: createEventsModel.reducer,

        scheduleFilters: scheduleFiltersModel.reducer,
        scheduleSearch: scheduleSearchModel.reducer,

        projectFilters: projectFiltersModel.reducer,
        projectSearch: projectSearchModel.reducer,
        createProject: createProjectModel.reducer,

        notificationFilters: notificationFilterModel.reducer,

        // entities
        color: colorListModel.reducer,

        viewer: viewerModel.reducer,

        eventList: eventsListModel.reducer,
        eventExpand: expandModel.reducer,

        projectList: projectsListModel.reducer,
        projectExpand: projectExpandModel.reducer,

        scheduleList: scheduleListModel.reducer,
        scheduleExpand: scheduleExpandModel.reducer,

        nearestList: nearestListModel.reducer,

        addressSearch: searchAddressModel.reducer,

        organizersSearch: organizersSearchModel.reducer,

        participantsSearch: participantsSearchModel.reducer,

        notificationList: notificationListModel.reducer,
        notificationArchiveList: notificationArchiveModel.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const StoreProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}