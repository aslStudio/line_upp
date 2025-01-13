import {Project, SubGroup} from "@/entities/projects/model"
import {Schedule} from "@/entities/schedule/model"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    filters: {
        type: 'all' | 'schedule' | 'project',
        project: Project[],
        subgroup: SubGroup[],
        schedule: Schedule[],
    }
}

const initialState: InitialState = {
    filters: {
        type: 'all',
        project: [],
        subgroup: [],
        schedule: [],
    }
}

const notificationFilterSlice = createSlice({
    name: 'features/notification/filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<Partial<InitialState['filters']>>) => {
            state.filters = {
                ...state.filters,
                ...action.payload
            }
        },
        reset: state => {
            state.filters = initialState.filters
        }
    }
})

export const notificationFilterModel = {
    reducer: notificationFilterSlice.reducer,
    actions: notificationFilterSlice.actions,
    thunks: {}
}