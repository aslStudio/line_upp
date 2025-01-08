import {createSlice, PayloadAction} from "@reduxjs/toolkit"

import {Color} from "@/entities/color/model"
import {Project, SubGroup} from "@/entities/projects/model"

import {EventType, OrderStatus} from "@/shared/api/enum.ts"
import {Maybe} from "@/shared/lib"

type InitialState = {
    filters: {
        color: Color[]
        project: Maybe<Project>
        subgroup: SubGroup[]
        eventType: EventType[]
        orderStatus: OrderStatus[]
        isFavorite: boolean
    }
}

const initialState: InitialState = {
    filters: {
        color: [],
        project: null,
        subgroup: [],
        eventType: [],
        orderStatus: [],
        isFavorite: false,
    }
}

const projectFiltersSlice = createSlice({
    name: 'feature/project/filters',
    initialState,
    reducers: {
        setFilters: (state, { payload }: PayloadAction<Partial<InitialState['filters']>>) => {
            state.filters = {
                ...state.filters,
                ...payload
            }
        },
        resetFilters: state => {
            state.filters = initialState.filters
        }
    }
})

export const projectFiltersModel = {
    reducer: projectFiltersSlice.reducer,
    actions: projectFiltersSlice.actions,
}