import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {ExpandProject} from "@/entities/projects/model"
import {User} from "@/entities/user/model"

import {projectsApi} from "@/shared/api/projects"
import {Maybe, RequestState} from "@/shared/lib"
import {InviteLinkType, ProjectAccessType, ReminderType} from "@/shared/api/enum.ts"

const createProjectThunk = createAsyncThunk(
    'features/project/createProject',
    projectsApi.create
)

const updateProjectThunk = createAsyncThunk(
    'features/project/updateProject',
    projectsApi.update
)

type InitialState = {
    data: {
        id: Maybe<number | string>
        name: string
        comment: string
        note: string
        reminder: {
            type: ReminderType
            value: number
        }
        isNeedSubmit: boolean
        organizers: (User & {
            isCreator: boolean
        })[]
        participants: User[]
        invited: User[]
        access: ProjectAccessType
        inviteLink: string
        inviteLinkType: InviteLinkType
        inviteLinkLimit: number
    },
    errors: {
        name: boolean
        organizers: boolean,
    },
    creatingState: RequestState
    updatingState: RequestState
}

const initialState: InitialState = {
    data: {
        id: null,
        name: '',
        comment: '',
        note: '',
        reminder: {
            type: ReminderType.HOUR,
            value: 1,
        },
        isNeedSubmit: false,
        organizers: [],
        participants: [],
        invited: [],
        access: ProjectAccessType.PUBLIC,
        inviteLink: '',
        inviteLinkType: InviteLinkType.PUBLIC,
        inviteLinkLimit: 0,
    },
    errors: {
        name: false,
        organizers: false,
    },
    creatingState: 'idle',
    updatingState: 'idle'
}

const createProjectSlice = createSlice({
    name: 'features/project/create',
    initialState,
    reducers: {
        update: (state, { payload }: PayloadAction<Partial<InitialState['data']>>) => {
            state.data = {
                ...state.data,
                ...payload,
            }
            const key = Object.keys(payload)[0]
            if (key in state.errors) {
                state.errors[key as keyof InitialState['errors']] = false
            }
        },
        removeParticipant: (state, { payload }: PayloadAction<Partial<InitialState['data']['participants'][number]>>) => {
            state.data.participants = state.data.participants.filter(item => item.id !== payload.id)
        },
        removeInvited: (state, { payload }: PayloadAction<Partial<InitialState['data']['invited'][number]>>) => {
            state.data.invited = state.data.invited.filter(item => item.id !== payload.id)
        },
        removeOrganizer: (state, { payload }: PayloadAction<Partial<InitialState['data']['organizers'][number]>>) => {
            state.data.organizers = state.data.organizers.filter(item => item.id !== payload.id)
        },
        makeCreator: (state, { payload }: PayloadAction<Partial<InitialState['data']['organizers'][number]>>) => {
            state.data.organizers = state.data.organizers.map(item => {
                if (item.id === payload.id) {
                    return {
                        ...item,
                        isCreator: true
                    }
                }

                return item
            })
        },
        setErrors: (state, { payload }: PayloadAction<InitialState['errors']>) => {
            state.errors = payload
        },
        init: (state, { payload }: PayloadAction<ExpandProject>) => {
            state.data = expandToDomain(payload)
        },
        reset: state => {
            state.data = initialState.data
            state.errors = {
                ...initialState.errors
            }
            state.creatingState = 'idle'
            state.updatingState = 'idle'
        }
    },
    extraReducers: builder => {
        builder.addCase(createProjectThunk.pending, state => {
            state.creatingState = 'pending'
        })
        builder.addCase(createProjectThunk.fulfilled, (state, { payload }) => {
            state.creatingState = payload.error ? 'error' : 'success'
        })
        builder.addCase(updateProjectThunk.pending, state => {
            state.updatingState = 'pending'
        })
        builder.addCase(updateProjectThunk.fulfilled, (state, { payload }) => {
            state.updatingState = payload.error ? 'error' : 'success'
        })
    }
})

export const createProjectModel = {
    reducer: createProjectSlice.reducer,
    actions: createProjectSlice.actions,
    thunks: {
        createProjectThunk,
        updateProjectThunk,
    }
}

function expandToDomain(data: ExpandProject): InitialState['data'] {
    return {
        id: data.id,
        name: data.name,
        comment: data.comment,
        note: data.note,
        reminder: data.reminder,
        isNeedSubmit: data.isNeedSubmit,
        organizers: data.organizers,
        participants: data.participants,
        invited: data.invited,
        access: data.access,
        inviteLink: data.inviteLink,
        inviteLinkType: data.inviteLinkType,
        inviteLinkLimit: data.inviteLinkLimit,
    }
}

export function validateProject(data: InitialState['data']) {
    return {
        name: !data.name,
        organizers: !data.organizers.length,
    }
}

export function isError(data: InitialState['errors']) {
    return Object.values(data).reduce((prev, curr) => {
        return prev || curr
    }, false)
}