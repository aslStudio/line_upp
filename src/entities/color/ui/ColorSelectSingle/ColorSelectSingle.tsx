import React, { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import {clsx} from "clsx"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {Color, colorListModel} from '@/entities/color/model'

import {Maybe, PropsDefault} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {SkeletonWrapper} from "@/shared/ui/SkeletonWrapper"

import styles from './ColorSelectSingle.module.scss'

export type ColorSelectSingleProps = PropsDefault<{
    value: Maybe<Color>
    setValue: (active: Color) => void
}>

export const ColorSelectSingle: React.FC<ColorSelectSingleProps> = ({
    value,
    setValue,
}) => {
    const {
        isPending,
        data,
    } = useSelector((state: RootState) => state.color)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(colorListModel.thunks.getColorsThunk())
    }, [])

    return (
        <TransitionFade className={styles.root}>
            {isPending && (
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
            {!isPending && (
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
                                    [styles['is-active']]: item.id === value?.id,
                                }
                            )}
                            onClick={() => setValue(item)}
                        />
                    ))}
                </div>
            )}
        </TransitionFade>
    )
}