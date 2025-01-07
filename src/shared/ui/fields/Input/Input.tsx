import React, {HTMLInputTypeAttribute, useCallback, useMemo, useRef} from "react"
import {useMaskito} from "@maskito/react"
import {maskitoTransform} from "@maskito/core"

import {PropsDefault} from "@/shared/lib"

import { InputBase } from '../InputBase'

import { masks } from './masks'
import styles from "./Input.module.scss"

export type InputProps = PropsDefault<{
    value: string
    placeholder?: string
    mask?: keyof typeof masks
    after?: string
    type?: HTMLInputTypeAttribute
    isError?: boolean
    setValue: (value: string) => void
}>

const InputComponent: React.FC<InputProps> = ({
    className,
    value,
    placeholder,
    type,
    after,
    mask,
    isError,
    setValue
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

    const maskedValue = useMemo(() =>{
        return mask
            ? maskitoTransform(value, masks[mask].options)
            : value
    }, [mask, value])

    const onInput = useCallback((v: string) => {
        if (mask) {
            setValue(masks[mask].unmaskFn(v))
            return
        }

        setValue(v)
    }, [setValue, mask])

    return (
        <InputBase
            className={className}
            isError={isError}
            onClick={() => {
                inputRef.current?.focus()
            }}
        >
            <div
                ref={mask ? ref : null}
                className={styles.root}
            >
                <input
                    ref={inputRef}
                    placeholder={placeholder}
                    className={styles.field}
                    value={maskedValue}
                    type={type}
                    onInput={e => onInput((e.target as HTMLInputElement).value as string)}
                />
                <p className={styles.after}>{after}</p>
            </div>
        </InputBase>
    )
}

export const Input = React.memo(InputComponent)