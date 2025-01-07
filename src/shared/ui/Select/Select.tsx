import React, {useMemo} from "react"

import {PropsDefault} from "@/shared/lib"
import {Icon} from "@/shared/ui/Icon"
import {BottomSheet, useModal} from "@/shared/ui/BottomSheet"

import styles from './Select.module.scss'
import {clsx} from "clsx";
import {Radio} from "@/shared/ui/Radio";

export type SelectProps = PropsDefault<{
    value: number | string
    data: {
        id: number | string
        text: string
    }[]
    setValue: (v: number | string) => void
}>

const SelectComponent: React.FC<SelectProps> = ({
    className,
    value,
    data,
    setValue,
}) => {
    const { isOpen, open, close } = useModal()

    const active = useMemo(() => {
        const activeItem = data.find(item => item.id === value)

        if (activeItem) {
            return activeItem.text
        }

        return ''
    }, [value, data])

    return (
        <>
            <div
                className={clsx(
                    className,
                    styles.root,
                )}
                onClick={open}
            >
                <p>{active}</p>
                <Icon
                    name={'chevron'}
                    size={16}
                    view={'base'}
                />
            </div>
            <BottomSheet
                isOpen={isOpen}
                setIsOpen={close}
            >
                <p
                    className={styles.title}
                >
                    Выберите тип повторения
                </p>
                {data.map(item => (
                    <Radio
                        className={styles.item}
                        value={item.id === value}
                        setValue={() => {
                            setValue(item.id)
                            close()
                        }}
                    >
                        {item.text}
                    </Radio>
                ))}
            </BottomSheet>
        </>
    )
}

export const Select = React.memo(SelectComponent)