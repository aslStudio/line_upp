import {createSlice, PayloadAction} from "@reduxjs/toolkit"

import { EventFilters } from './types.ts'

type InitialState = {
    filters: EventFilters
}

const initialState: InitialState = {
    filters: {
        color: [],
        project: [],
        subgroup: [],
        schedule: [],
        eventType: [],
        orderStatus: [],
        isFavorite: false
    }
}

const eventsFiltersSlice = createSlice({
    name: 'features/events/filters',
    initialState,
    reducers: {
        setFilters: (state, { payload }: PayloadAction<Partial<InitialState['filters']>>) => {
            state.filters = {
                ...state.filters,
                ...payload,
            }
        },
        resetFilters: state => {
            state.filters = initialState.filters
        }
    }
})

export const eventsFiltersModel = {
    reducer: eventsFiltersSlice.reducer,
    actions: eventsFiltersSlice.actions,
}