import React from "react"

import {PropsDefault} from "@/shared/lib"
import {NoteSkeleton} from "@/shared/ui/Note"

export const EventNoteSkeleton: React.FC<PropsDefault> = ({
    className
}) => {
    return (
        <NoteSkeleton
            className={className}
        />
    )
}