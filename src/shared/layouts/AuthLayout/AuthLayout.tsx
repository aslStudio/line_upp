import React from "react"

import styles from './AuthLayout.module.scss'
import {clsx} from "clsx";

export type AuthLayoutProps = React.PropsWithChildren<{
    title: string
    description?: string
    offsetTop?: 's' | 'm'
}>

const AuthLayoutComponent: React.FC<AuthLayoutProps> = ({
    title,
    description,
    offsetTop = 'm',
    children
}) => (
    <div
        className={clsx(
            styles.root,
            styles[`offset-top_${offsetTop}`]
        )}
    >
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.wrapper}>
            {children}
        </div>
    </div>
)

export const AuthLayout = React.memo(AuthLayoutComponent)