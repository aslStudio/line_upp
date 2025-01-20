import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"
import {Toggle} from "@/shared/ui/Toggle"

import styles from './CardToggle.module.scss'
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {Loader} from "@/shared/ui/Loader";

export type CardToggleProps = PropsDefault<{
    className?: string
    title: string
    isLoading: boolean
    value: boolean
    setValue: (value: boolean) => void
}>

export const CardToggle: React.FC<CardToggleProps> = ({
    className,
    title,
    isLoading,
    value,
    setValue,
}) => (
    <div
        className={clsx(
            styles.root,
            className,
        )}
    >
        <p className={styles.title}>{title}</p>
        <TransitionFade className={styles.wrapper}>
            {isLoading && (
                <Loader
                    key={'Loader'}
                    size={'s'}
                    color={'brand'}
                />
            )}
            {!isLoading && (
                <Toggle
                    key={'Toggle'}
                    value={value}
                    setValue={setValue}
                />
            )}
        </TransitionFade>
    </div>
)