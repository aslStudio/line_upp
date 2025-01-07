import { ColorApi } from './types.ts'
import {createRequest} from "@/shared/lib/api/createRequest.ts";

export const colorApi: ColorApi = {
    getColors: async () =>
        createRequest({
            url: 'color',
            method: 'GET',
        })
}