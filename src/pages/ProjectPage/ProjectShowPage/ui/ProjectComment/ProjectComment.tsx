import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {InfoSection} from "@/shared/ui/InfoSection";

export const ProjectComment = () => {
    const {
        project
    } = useSelector((state: RootState) => state.projectExpand)

    if (project?.comment) {
        return (
            <InfoSection
                label={'Комментарий организатора'}
                text={project?.comment ?? ''}
            />
        )
    }

    return null
}