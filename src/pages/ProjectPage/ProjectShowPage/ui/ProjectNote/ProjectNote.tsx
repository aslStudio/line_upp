import {useCallback} from "react"
import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {usePatchProject} from "@/features/project/hooks"

import {Note} from "@/shared/ui/Note"

export const ProjectNote = () => {
    const {
        project
    } = useSelector((state: RootState) => state.projectExpand)

    const {
        isLoading,
        patchProject
    } = usePatchProject()

    const onUpdate = useCallback(async (v: string) => {
        if (project) {
            await patchProject({
                id: project.id,
                note: v,
            })
        }
    }, [project])

    return (
        <Note
            initValue={project?.note ?? ''}
            onUpdateValue={onUpdate}
            isLoading={isLoading}
        />
    )
}