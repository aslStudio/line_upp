import React, {useRef} from "react"

import {PropsDefault} from "@/shared/lib"

import { InputBase } from '../InputBase'

import styles from './Textarea.module.scss'

export type TextareaProps = PropsDefault<{
    value: string
    placeholder?: string
    setValue: (value: string) => void
}>

const TextareaComponent: React.FC<TextareaProps> = ({
    className,
    value,
    placeholder,
    setValue
}) => {
    const rootRef = useRef<HTMLTextAreaElement | null>(null)

    return (
        <InputBase
            className={className}
            size={'dynamic'}
            onClick={() => {
                rootRef.current?.focus()
            }}
        >
            <textarea
                className={styles.root}
                value={value}
                placeholder={placeholder}
                onInput={e => setValue((e.target as HTMLTextAreaElement).value)}
            />
        </InputBase>
    )
}

export const Textarea = React.memo(TextareaComponent)