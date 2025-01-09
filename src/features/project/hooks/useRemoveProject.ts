import {useState} from "react"

import {Project} from "@/entities/projects/model/types.ts"

import {projectsApi} from "@/shared/api/projects"

export const useRemoveProject = () => {
    const [isLoading, setIsLoading] = useState(false)

    async function remove(
        id: Project['id'],
        cb?: () => void
    ) {
        setIsLoading(true)

        await projectsApi.remove({ id: id })
        cb?.()

        setIsLoading(false)
    }

    return {
        isLoading,
        remove,
    }
}