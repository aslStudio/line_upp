import { ViewerApi } from './types.ts'
import {createRequest} from "@/shared/lib/api/createRequest.ts";
import {delay} from "@/shared/lib/time.ts";

export const viewerApi: ViewerApi = {
    getViewer: async () =>
        createRequest({
            url: 'profiles/me',
            method: 'GET',
        }),
    patchViewer: async data =>
        createRequest({
            url: 'profiles/me',
            method: 'PATCH',
            data,
        }),
    removeAccount: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    }
}