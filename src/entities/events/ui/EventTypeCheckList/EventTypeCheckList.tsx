import React from "react"

import {PropsDefault} from "@/shared/lib"
import {EventType} from "@/shared/api/enum.ts"
import {CheckboxList} from "@/shared/ui/CheckboxList";

export type EventTypeCheckListProps = PropsDefault<{
    value: EventType[]
    setValue: (value: EventType[]) => void
}>

export const EventTypeCheckList: React.FC<EventTypeCheckListProps> = ({
    className,
    value,
    setValue
}) => {
    const data = [
        {
            id: EventType.CLOSED,
            text: 'Закрытые'
        },
        {
            id: EventType.OPENED,
            text: 'Открытые'
        },
        {
            id: EventType.PERSONAL,
            text: 'Личные'
        },
    ]

    return (
        <CheckboxList
            className={className}
            data={data}
            value={value}
            setValue={v => setValue(v as EventType[])}
        />
    )
}