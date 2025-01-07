import { ProjectsApi } from './types.ts'
import {createRequest} from "@/shared/lib/api/createRequest.ts";

export const projectsApi: ProjectsApi = {
    getProjectsList: async () =>
        createRequest({
            url: 'projects',
            method: 'GET',
        })
}