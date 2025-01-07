import React from "react"

import { PropsDefaultWithChildren } from "@/shared/lib/types"

import styles from './SkeletonWrapper.module.scss'
import {clsx} from "clsx";

export const SkeletonWrapper: React.FC<PropsDefaultWithChildren> = ({
    className,
    children,
}) => (
    <div
        className={clsx(
            className,
            styles.root,
        )}
        style={{
            animationName: styles['skeleton-animation']
        }}
    >
        {children}
    </div>
)