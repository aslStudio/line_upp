import {useState} from "react"

import {Project} from "@/entities/projects/model/types.ts"

import {projectsApi} from "@/shared/api/projects"

export const usePatchProject = () => {
    const [isLoading, setIsLoading] = useState(false)

    async function patchProject({
        id,
        note
    }: {
        id: Project['id']
        note?: string
    }) {
        setIsLoading(true)

        await projectsApi.patchProject({
            id,
            note,
        })

        setIsLoading(false)
    }

    return {
        isLoading,
        patchProject,
    }
}