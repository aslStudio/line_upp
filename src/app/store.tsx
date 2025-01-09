import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import {loginModel, registrationModel} from "@/features/auth/model"
import {eventsFiltersModel, eventsSearchModel, createEventsModel} from "@/features/events/model"
import {scheduleFiltersModel, scheduleSearchModel} from "@/features/schedule/model"
import {projectFiltersModel, projectSearchModel} from "@/features/project/model"

import {colorListModel} from "@/entities/color/model"
import {eventsListModel, expandModel, nearestListModel} from "@/entities/events/model"
import {projectExpandModel, projectsListModel} from "@/entities/projects/model"
import {viewerModel} from "@/entities/viewer/model"
import {scheduleExpandModel, scheduleListModel} from "@/entities/schedule/model"
import {searchAddressModel} from "@/entities/address/model"
import {organizersSearchModel, participantsSearchModel} from "@/entities/user/model"

const store = configureStore({
    reducer: {
        // features
        login: loginModel.reducer,
        registration: registrationModel.reducer,
        eventsFilters: eventsFiltersModel.reducer,
        eventsSearch: eventsSearchModel.reducer,
        createEvent: createEventsModel.reducer,

        scheduleFilters: scheduleFiltersModel.reducer,
        scheduleSearch: scheduleSearchModel.reducer,

        projectFilters: projectFiltersModel.reducer,
        projectSearch: projectSearchModel.reducer,

        // entities
        color: colorListModel.reducer,
        eventList: eventsListModel.reducer,
        projectList: projectsListModel.reducer,
        viewer: viewerModel.reducer,
        scheduleList: scheduleListModel.reducer,
        nearestList: nearestListModel.reducer,
        eventExpand: expandModel.reducer,
        addressSearch: searchAddressModel.reducer,
        organizersSearch: organizersSearchModel.reducer,
        participantsSearch: participantsSearchModel.reducer,
        scheduleExpand: scheduleExpandModel.reducer,
        projectExpand: projectExpandModel.reducer,
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