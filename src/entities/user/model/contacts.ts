import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {User} from "@/entities/user/model/types.ts"

import {usersApi} from "@/shared/api/users"

const getContactsThunk = createAsyncThunk(
    'entities/user/contacts/getContactsThunk',
    usersApi.getUsers
)

type InitialState = {
    isPending: boolean,
    searchValue: string
    contacts: User[]
    global: User[]
}

const initialState: InitialState = {
    isPending: false,
    searchValue: '',
    contacts: [],
    global: [],
}

const contactsSlice = createSlice({
    name: 'entities/user/contacts',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        reset: state => {
            state.contacts = []
            state.global = []
        }
    },
    extraReducers: builder => {
        builder.addCase(getContactsThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(getContactsThunk.fulfilled, (state, { payload }) => {
            state.isPending = false
            if (payload.payload) {
                state.contacts = payload.payload.contacts
                state.global = payload.payload.global
            }
        })
    }
})

export const contactsSearchModel = {
    reducers: contactsSlice.reducer,
    actions: contactsSlice.actions,
    thunks: {
        getContactsThunk,
    }
}