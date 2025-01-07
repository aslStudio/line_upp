import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"

import styles from './InfoSection.module.scss'

export type InfoSectionProps = PropsDefault<{
    label: string
    text: string
}>

export const InfoSection: React.FC<InfoSectionProps> = ({
    className,
    label,
    text
}) => (
    <div
        className={clsx(
            styles.root,
            className,
        )}
    >
        <p className={styles.label}>{label}</p>
        <p className={styles.content}>{text}</p>
    </div>
)