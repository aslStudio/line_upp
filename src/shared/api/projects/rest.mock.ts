import { ProjectsApi } from './types.ts'
import {delay} from "@/shared/lib/time.ts";
import {getRandomInt} from "@/shared/lib/number.ts";

export const projectsApi: ProjectsApi = {
    getProjectsList: async () => {
        await delay()

        return {
            error: false,
            payload: getList(),
        }
    }
}

function getList() {
    return Array(getRandomInt(1, 10)).fill(1).map(() => ({
        id: getRandomInt(1, 10_000),
        name: `project ${getRandomInt(1, 10_000)}`,
        subgroups: Array(getRandomInt(0, 5)).fill(1).map(() => ({
            id: getRandomInt(1, 10_000),
            name: `subgroup ${getRandomInt(1, 10_000)}`,
        }))
    }))
}