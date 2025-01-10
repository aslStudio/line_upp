import React from "react"

import {PropsDefault} from "@/shared/lib"
import {Icon} from "@/shared/ui/Icon"
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {Loader} from "@/shared/ui/Loader";

import {InputBase} from "../InputBase"

import styles from "./InputSearch.module.scss"

export type InputSearchProps = PropsDefault<{
    rootRef?: React.RefObject<HTMLInputElement | null>
    value: string
    placeholder?: string
    isLoading: boolean
    onInput: (v: string) => void
    onSearch: (v: string) => void
    onFocus?: () => void
    onBlur?: () => void
}>

let timeout: NodeJS.Timeout

const InputSearchComponent: React.FC<InputSearchProps> = ({
    rootRef,
    className,
    value,
    placeholder = 'Поиск',
    isLoading,
    onInput,
    onSearch,
    onBlur,
    onFocus
}) => {
    function inputHandler(v: string) {
        onInput(v)
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            onSearch(v)
            clearTimeout(timeout)
        }, 400)
    }

    return (
        <InputBase
            className={className}
            size={'m'}
            view={'secondary'}
            onClick={() => {
                rootRef?.current?.focus()
            }}
        >
            <div className={styles.root}>
                <TransitionFade
                    className={styles.left}
                >
                    {isLoading
                        ? (
                            <Loader
                                size={'s'}
                                color={'placeholder'}
                            />
                        ) : (
                            <Icon
                                name={'search'}
                                view={'placeholder'}
                                size={18}
                            />
                        )}
                </TransitionFade>
                <input
                    className={styles.field}
                    value={value}
                    placeholder={placeholder}
                    onInput={e => {
                        inputHandler((e.target as HTMLInputElement).value)
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>
        </InputBase>
    )
}

export const InputSearch = React.memo(InputSearchComponent)