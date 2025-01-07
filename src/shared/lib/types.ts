import React from "react"

export type PropsDefault<
    T extends Record<string, unknown>
        = Record<string, unknown>
> = {
    className?: string
} & T

export type PropsDefaultWithChildren<
    T extends Record<string, unknown>
        = Record<string, unknown>
> =
    React.PropsWithChildren<PropsDefault<T>>

export type RequestState = 'idle' | 'success' | 'error' | 'pending'

export type TimeStamp = number

export type Maybe<T> = T | null