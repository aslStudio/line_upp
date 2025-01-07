import {ResponseDefault} from "@/shared/lib/api/createRequest.ts";

export type GetProjectsResponse = {
    id: number
    name: string,
    subgroups: {
        id: number,
        name: string
    }[],
}[]

export type ProjectsApi = {
    getProjectsList: () =>
        Promise<ResponseDefault<GetProjectsResponse>>
}