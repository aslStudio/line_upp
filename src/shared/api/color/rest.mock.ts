import {delay} from "@/shared/lib/time.ts"

import { ColorApi } from './types.ts'

export const colorApi: ColorApi = {
    getColors: async () => {
        await delay()

        return {
            error: false,
            payload: [
                {
                    id: 1,
                    name: 'red',
                },
                {
                    id: 2,
                    name: 'yellow',
                },
                {
                    id: 3,
                    name: 'green',
                },
                {
                    id: 4,
                    name: 'blue',
                },
                {
                    id: 5,
                    name: 'gray',
                },
                {
                    id: 6,
                    name: 'white',
                },
                {
                    id: 7,
                    name: 'darkgreen',
                },
                {
                    id: 8,
                    name: 'purple',
                },
                {
                    id: 9,
                    name: 'darkblue',
                },
            ]
        }
    }
}