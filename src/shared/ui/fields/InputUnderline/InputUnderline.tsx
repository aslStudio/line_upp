import React from "react"

import {PropsDefault} from "@/shared/lib"

import styles from "./InputUnderline.module.scss"
import {clsx} from "clsx";
import {TransitionFade} from "@/shared/ui/TransitionFade";

export type InputUnderlineProps = PropsDefault<{
    value: string
    placeholder: string
    size?: 'm' | 'l'
    error?: boolean
    errorMessage?: string
    maxLength?: number
    setValue: (value: string) => void
}>

const InputUnderlineComponent: React.FC<InputUnderlineProps> = ({
    value,
    placeholder,
    size,
    error,
    errorMessage,
    maxLength,
    setValue,
}) => {
    return (
        <div>
            <div
                className={clsx(
                    styles.root,
                )}
            >
                <input
                    className={clsx(
                        styles.field,
                        styles[`size_${size}`],
                        {
                            [styles['with-max-length']]: !!maxLength,
                        }
                    )}
                    value={value}
                    placeholder={placeholder}
                    onInput={e => {
                        const newValue = (e.target as HTMLInputElement).value
                        if (maxLength) {
                            if (newValue.length <= maxLength) {
                                setValue(newValue)
                            }
                        } else {
                            setValue(newValue)
                        }
                    }}
                />
                {maxLength && (
                    <p className={styles['max-length']}>
                        {value.length}/{maxLength}
                    </p>
                )}
            </div>
            <TransitionFade>
                {error && errorMessage && (
                    <p className={styles.error}>{errorMessage}</p>
                )}
            </TransitionFade>
        </div>
    )
}

export const InputUnderline = React.memo(InputUnderlineComponent)