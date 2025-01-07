import React, {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Color, colorListModel} from '@/entities/color/model'

import {PropsDefault} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade";

import styles from './ColorSelect.module.scss'
import {SkeletonWrapper} from "@/shared/ui/SkeletonWrapper";
import {clsx} from "clsx";

export type ColorSelectProps = PropsDefault<{
    value: Color[]
    setValue: (active: Color[]) => void
}>

export const ColorSelect: React.FC<ColorSelectProps> = ({
    value,
    setValue,
}) => {
    const {
        isPending,
        data,
    } = useSelector((state: RootState) => state.color)
    const dispatch = useDispatch<AppDispatch>()

    function getIsSelected(id: number) {
        return value.findIndex(item => item.id === id) !== -1
    }

    const onClick = useCallback((v: Color) => {
        if (getIsSelected(v.id)) {
            const copy = value.filter(item => item.id !== v.id)
            setValue(copy)
        } else {
            setValue([
                ...value,
                v,
            ])
        }
    }, [value, setValue])

    useEffect(() => {
        dispatch(colorListModel.thunks.getColorsThunk())
    }, [])

    return (
        <TransitionFade className={styles.root}>
            {isPending && data.length === 0 && (
                <SkeletonWrapper
                    key={'Skeleton'}
                    className={styles.wrapper}
                >
                    {Array(3).fill(1).map((_, key) => (
                        <div
                            key={key}
                            className={clsx(
                                styles['color-item'],
                                styles['is-skeleton']
                            )}
                        />
                    ))}
                </SkeletonWrapper>
            )}
            {(!isPending || data.length > 0) && (
                <div
                    key={'Content'}
                    className={styles.wrapper}
                >
                    {data.map(item => (
                        <button
                            key={item.id}
                            style={{
                                backgroundColor: item.name,
                            }}
                            className={clsx(
                                styles['color-item'],
                                {
                                    [styles['is-active']]: getIsSelected(item.id),
                                }
                            )}
                            onClick={() => onClick(item)}
                        />
                    ))}
                </div>
            )}
        </TransitionFade>
    )
}