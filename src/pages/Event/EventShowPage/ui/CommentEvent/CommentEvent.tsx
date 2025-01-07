import React from "react";
import {PropsDefault} from "@/shared/lib";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store.tsx";
import {InfoSection} from "@/shared/ui/InfoSection";

export const CommentEvent: React.FC<PropsDefault> = ({
    className
}) => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand);

    if (event?.comment) {
        return (
            <InfoSection
                className={className}
                label={'Комментарий организатора'}
                text={event?.comment ?? ''}
            />
        )
    }

    return null
}