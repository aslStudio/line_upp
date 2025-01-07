import React, {useCallback} from "react"
import {clsx} from "clsx"

import {Checkbox} from "@/shared/ui/Checkbox"
import {PropsDefault} from "@/shared/lib"

import styles from './CheckboxList.module.scss'

type Item = {
    id: number | string
    text: string
}

export type CheckboxListProps = PropsDefault<{
    value: (number | string)[]
    setValue: (v: (number | string)[]) => void
    data: Item[]
}>

export const CheckboxList: React.FC<CheckboxListProps> = ({
    className,
    value,
    setValue,
    data
}) => {
    const onSelect = useCallback((
        item: number | string,
        isAdd: boolean
    ) => {
        if (isAdd) {
            setValue([
                ...value,
                item
            ])
        } else {
            const copy = value.filter(type => type !== item)
            setValue(copy)
        }
    }, [value, setValue])

    return (
        <div
            className={clsx(
                className,
                styles.root,
            )}
        >
            {data.map(item => (
                <Checkbox
                    key={item.id}
                    value={value.includes(item.id)}
                    setValue={v => {
                        onSelect(item.id, v)
                    }}
                >
                    {item.text}
                </Checkbox>
            ))}
        </div>
    )
}