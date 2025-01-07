import React, {useCallback, useState} from "react"

import {PropsDefault} from "@/shared/lib"
import {Icon} from "@/shared/ui/Icon"
import {Radio} from "@/shared/ui/Radio"
import {TransitionExpand} from "@/shared/ui/TransitionExpand";

import styles from './CollapseRadio.module.scss'
import {clsx} from "clsx";

type Item = {
    id: number
    name: string
}

export type CollapseRadioProps = PropsDefault<{
    title: string
    data:Item[]
    value: Item[]
    setValue: (value: Item[]) => void
}>

const CollapseRadioComponent: React.FC<CollapseRadioProps> = ({
    className,
    title,
    data,
    value,
    setValue,
}) => {
    const [isShow, setIsShow] = useState(true)

    const getIsActive = useCallback((v: number) => {
        return value.findIndex(item => item.id === v) !== -1
    }, [value])

    const onSelect = useCallback((v: Item) => {
        if (getIsActive(v.id)) {
            const copy = value.filter(item => item.id !== v.id)
            setValue(copy)
        } else {
            setValue([
                ...value,
                v,
            ])
        }
    }, [value, setValue, getIsActive])

    return (
        <div className={clsx(
            styles.root,
            className,
        )}>
            <div
                className={styles.header}
                onClick={() => setIsShow(prevState => !prevState)}
            >
                <p>{title}</p>
                <Icon
                    className={clsx(
                        styles.icon,
                        {
                            [styles['is-active']]: isShow,
                        }
                    )}
                    name={'chevron'}
                    size={20}
                    view={'placeholder'}
                />
            </div>
            <TransitionExpand isShow={isShow}>
                <div className={styles.list}>
                    {data.map(item => (
                        <Radio
                            key={item.id}
                            value={getIsActive(item.id)}
                            setValue={() => onSelect(item)}
                        >
                            {item.name}
                        </Radio>
                    ))}
                </div>
            </TransitionExpand>
        </div>
    )
}

export const CollapseRadio = React.memo(CollapseRadioComponent)