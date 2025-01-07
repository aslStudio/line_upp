import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

export type GetColorListResponse = {
    id: number
    name: string
}[]

export type ColorApi = {
    getColors: () =>
        Promise<ResponseDefault<GetColorListResponse>>
}