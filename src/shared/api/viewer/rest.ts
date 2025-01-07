import { ViewerApi } from './types.ts'
import {createRequest} from "@/shared/lib/api/createRequest.ts";

export const viewerApi: ViewerApi = {
    getViewer: () =>
        createRequest({
            url: 'profiles/me',
            method: 'GET',
        })
}