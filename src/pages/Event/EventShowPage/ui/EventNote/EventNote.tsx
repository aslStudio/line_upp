import React, { useCallback } from "react"
import {useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {usePatchEvent} from "@/features/events/hooks"

import {PropsDefault} from "@/shared/lib"
import {Note} from "@/shared/ui/Note";

export const EventNote: React.FC<PropsDefault> = ({
    className
}) => {
    const {
        event
    } = useSelector((state: RootState) => state.eventExpand);

    const {
        isLoading,
        patchEvent
    } = usePatchEvent()

    const onUpdate = useCallback(async (v: string) => {
        if (event) {
            await patchEvent({
                id: event.id,
                isFavorite: event.isFavorite,
                note: v,
            })
        }
    }, [event])

    return (
        <Note
            className={className}
            initValue={event?.note ?? ''}
            onUpdateValue={onUpdate}
            isLoading={isLoading}
        />
    )
}