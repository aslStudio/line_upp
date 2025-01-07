import React from "react"
import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {PropsDefault} from "@/shared/lib"
import {InfoSection} from "@/shared/ui/InfoSection";

export const AboutEvent: React.FC<PropsDefault> = ({
    className
}) => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand);

    return (
        <InfoSection
            className={className}
            label={'О событии'}
            text={event?.about ?? ''}
        />
    )
}