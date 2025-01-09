import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {projectsApi} from "@/shared/api/projects"
import {ResponseDefault} from "@/shared/lib/api/createRequest.ts"
import {GetProjectsResponse} from "@/shared/api/projects/types.ts"

import { Project } from './types.ts'

const getProjectsThunk = createAsyncThunk(
    'entities/projects/getProjects',
    projectsApi.getProjectsList
)

const initialState: {
    data: Project[]
    isPending: boolean
} = {
    data: [],
    isPending: true,
}

const projectsSlice = createSlice({
    name: 'entities/projects/list',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProjectsThunk.pending, state => {
            if (!state.data.length) {
                state.isPending = true
            }
        })
        builder.addCase(getProjectsThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            console.log(payload.payload, toDomain(payload))
            if (!payload.error) {
                state.data = toDomain(payload)
            }
        })
    }
})

export const projectsListModel = {
    reducer: projectsSlice.reducer,
    actions: projectsSlice.actions,
    thunks: {
        getProjectsThunk,
    }
}

function toDomain(data: ResponseDefault<GetProjectsResponse>): Project[] {
    return data.payload!.reduce((prev, curr) => {
        return [
            ...prev,
            {
                id: curr.id,
                name: curr.name,
                subgroups: curr.subgroups.map(item => ({
                    ...item,
                    projectId: curr.id,
                }))
            }
        ]
    }, [] as Project[])
}
