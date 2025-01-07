import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

import {addressApi, GetAddressListResponse} from "@/shared/api/address"
import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

import { Address } from './types.ts'

const searchThunk = createAsyncThunk(
    'entities/address/searchThunk',
    addressApi.getAddress
)

type InitialState ={
    searchValue: string,
    isPending: boolean,
    data: Address[]
}

const initialState: InitialState = {
    searchValue: '',
    isPending: false,
    data: []
}

const searchAddressSlice = createSlice({
    name: 'entities/address/search',
    initialState,
    reducers: {
        setSearchValue: (state, { payload }: PayloadAction<string>) => {
            state.searchValue = payload
        },
        reset: state => {
            state.searchValue = ''
            state.isPending = false
            state.data = []
        }
    },
    extraReducers: builder => {
        builder.addCase(searchThunk.pending, state => {
            state.isPending = true
        })
        builder.addCase(searchThunk.fulfilled, (state, { payload }) => {
            state.data = toDomain(payload)
            state.isPending = false
        })
    }
})

export const searchAddressModel = {
    reducer: searchAddressSlice.reducer,
    actions: searchAddressSlice.actions,
    thunks: {
        searchThunk,
    }
}

function toDomain(data: ResponseDefault<GetAddressListResponse>): Address[] {
    if (data.payload) {
        return data.payload.suggestions.map(item => ({
            value: item.value,
            ...item.data
        }))
    }

    return  []
}