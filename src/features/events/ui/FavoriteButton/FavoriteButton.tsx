import React, {useCallback, useState} from "react"

import {usePatchEvent} from "@/features/events/hooks"

import {Event, ExpandEvent} from "@/entities/events/model"

import {PropsDefault} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Loader} from "@/shared/ui/Loader"
import {Icon} from "@/shared/ui/Icon"

import styles from './FavoriteButton.module.scss'
import {clsx} from "clsx";

export type FavoriteButtonProps = PropsDefault<{
    event: Event | ExpandEvent
    size: number
}>

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    className,
    size,
    event,
}) => {
    const {
        isLoading,
        patchEvent
    } = usePatchEvent()

    const [isFavorite, setIsFavorite] = useState(event.isFavorite)

    const onClick = useCallback(async () => {
        await patchEvent({
            id: event.id,
            isFavorite: !isFavorite,
        })
        setIsFavorite(!isFavorite)
    }, [event, isFavorite])

    return (
        <button
            className={clsx(
                className,
                styles.root
            )}
            style={{
                width: size,
                height: size,
            }}
            onClick={onClick}
        >
            <TransitionFade>
                {isLoading && (
                    <Loader
                        size={'s'}
                        color={'white'}
                    />
                )}
                {!isLoading && isFavorite && (
                    <Icon
                        name={'favorite-filled'}
                        view={'red'}
                        size={size}
                    />
                )}
                {!isLoading && !isFavorite && (
                    <Icon
                        name={'favorite-outline'}
                        view={'gray'}
                        size={size}
                    />
                )}
            </TransitionFade>
        </button>
    )
}