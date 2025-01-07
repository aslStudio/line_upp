import React, {useEffect, useRef} from "react"

import {PropsDefault} from "@/shared/lib";
import {InputBase} from "@/shared/ui/fields/InputBase";

import styles from './InputCode.module.scss'

export type InputCodeProps = PropsDefault<{
    value: string
    isError?: boolean
    setValue: (value: string) => void
    onFill?: (value: string) => void
}>

const InputCodeComponent: React.FC<InputCodeProps> = ({
    className,
    value,
    isError,
    setValue,
    onFill
}) => {
    const refs = useRef<HTMLInputElement[]>([])

    function getValue() {
        return refs.current.reduce(
            (prev, curr) => prev + (curr?.value ?? ''),
            ''
        )
    }

    function onInput(v: string, index: number) {
        setValue(getValue())
        if (v.length && index + 1 < refs.current.length) {
            refs.current[index + 1].focus()
            return
        }
        if (!v.length && index - 1 >= 0) {
            refs.current[index - 1].focus()
            return;
        }
    }

    useEffect(() => {
        if (value.length === 6) {
            onFill?.(value)
        }
    }, [value, onFill])

    return (
        <InputBase
            className={className}
            isError={isError}
            onClick={() => {
                if (value.length) {
                    refs.current?.[value.length - 1]?.focus()
                } else {
                    refs.current?.[0]?.focus()
                }
            }}
        >
            <div className={styles.root}>
                <div className={styles.sub}>
                    {Array(3).fill(1).map((_, key) => (
                        <input
                            key={key}
                            ref={el => {
                                refs.current![key] = el!
                            }}
                            className={styles.item}
                            value={value[key] ?? ''}
                            onChange={e => onInput(e.target.value, key)}
                            onPaste={console.log}
                        />
                    ))}
                </div>
                <div className={styles.sub}>
                    {Array(3).fill(1).map((_, key) => (
                        <input
                            key={key + 3}
                            ref={el => {
                                refs.current![key + 3] = el!
                            }}
                            className={styles.item}
                            value={value[key + 3] ?? ''}
                            onChange={e => onInput(e.target.value, key + 3)}
                        />
                    ))}
                </div>
            </div>
        </InputBase>
    )
}

export const InputCode = React.memo(InputCodeComponent)