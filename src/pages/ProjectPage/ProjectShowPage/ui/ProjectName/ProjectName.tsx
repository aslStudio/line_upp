import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

export const ProjectName = () => {
    const {
        project
    } = useSelector((state: RootState) => state.projectExpand)

    return (
        <div>
            <p>{project?.name ?? ''}</p>
        </div>
    )
}