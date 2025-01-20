import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {useMaskito} from "@maskito/react"
import {maskitoTransform} from "@maskito/core"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Loader} from "@/shared/ui/Loader"
import {images} from "@/shared/assets/images"

import { masks } from './masks.ts'
import styles from './InputEditField.module.scss'

export type InputEditFieldProps = PropsDefault<{
    className?: string
    value: string
    setValue: (v: string) => void
    label: string
    isLoading: boolean
    mask?: keyof typeof masks
}>

export const InputEditField: React.FC<InputEditFieldProps> = ({
    className,
    value,
    mask,
    label,
    isLoading,
    setValue,
}) => {
    const ref = useMaskito({
        options: mask
            ? {
                ...masks[mask].options
            }
            : {
                mask: [],
            }
    })
    const inputRef = useRef<HTMLInputElement>(null)

    const [localValue, setLocalValue] = useState('')
    const [isFocus, setIsFocus] = useState(false)

    const maskedValue = useMemo(() =>{
        return mask
            ? maskitoTransform(localValue, masks[mask].options)
            : localValue
    }, [mask, localValue])

    const onInput = useCallback((v: string) => {
        if (mask) {
            setLocalValue(masks[mask].unmaskFn(v))
            return
        }

        setLocalValue(v)
    }, [mask])

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    return (
        <div
            className={clsx(
                styles.root,
                className,
            )}
            ref={mask ? ref : null}
            onClick={() => {
                inputRef.current?.focus()
            }}
        >
            <p className={styles.label}>{label}</p>
            <input
                className={styles.value}
                ref={inputRef}
                value={maskedValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onInput={e => onInput((e.target as HTMLInputElement).value as string)}
            />
            <TransitionFade className={styles.right}>
                {isLoading && (
                    <Loader
                        key={'loader'}
                        size={'xs'}
                        color={'brand'}
                    />
                )}
                {!isLoading && isFocus && (
                    <button
                        key={'save'}
                        className={styles['save-button']}
                        onClick={() => {
                            setValue(localValue)
                            inputRef.current?.blur()
                        }}
                    >
                        Сохранить
                    </button>
                )}
                {!isLoading && !isFocus && (
                    <button
                        key={'edit'}
                        className={styles['save-button']}
                        onClick={() => {
                            inputRef.current?.focus()
                        }}
                    >
                        <img
                            src={images.Viewer.Edit}
                            alt={'edit'}
                        />
                    </button>
                )}
            </TransitionFade>
        </div>
    )
}