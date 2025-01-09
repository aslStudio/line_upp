import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {projectsApi} from "@/shared/api/projects"
import {Maybe} from "@/shared/lib"

import { ExpandProject } from './types.ts'

const fetchExpandProject = createAsyncThunk(
    'entities/projects/expand/fetchExpandProject',
    projectsApi.getExpandProject
)

type InitialState = {
    isPending: boolean
    project: Maybe<ExpandProject>
}

const initialState: InitialState = {
    isPending: true,
    project: null,
}

const expandProjectSlice = createSlice({
    name: 'entities/project/expand',
    initialState,
    reducers: {
        reset: state => {
            state.isPending = true
            state.project = null
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExpandProject.pending, state => {
            state.isPending = true
        })
        builder.addCase(fetchExpandProject.fulfilled, (state, { payload }) => {
            if (payload.payload) {
                state.project = payload.payload
                state.isPending = false
            }
        })
    }
})

export const projectExpandModel = {
    reducer: expandProjectSlice.reducer,
    actions: expandProjectSlice.actions,
    thunks: {
        fetchExpandProject,
    }
}