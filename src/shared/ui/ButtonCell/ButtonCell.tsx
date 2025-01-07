import React from "react"
import {clsx} from "clsx"

import {PropsDefaultWithChildren} from "@/shared/lib"
import {Icon, IconProps} from "@/shared/ui/Icon"

import styles from './ButtonCell.module.scss'

export type ButtonCellProps = PropsDefaultWithChildren<{
    icon: IconProps['name']
    iconStyles?: React.CSSProperties
    withHorizontalPadding?: boolean
    onClick?: () => void
}>

const ButtonCellComponent: React.FC<ButtonCellProps> = ({
    className,
    icon,
    iconStyles,
    withHorizontalPadding = false,
    onClick,
    children
}) => {
    return (
        <button
            className={clsx(
                className,
                styles.root,
                {
                    [styles['with-horizontal-padding']]: withHorizontalPadding,
                }
            )}
            onClick={onClick}
        >
            <div style={iconStyles}>
                <Icon
                    name={icon}
                    view={'brand'}
                    size={20}
                />
            </div>
            <p>{children}</p>
        </button>
    )
}

export const ButtonCell = React.memo(ButtonCellComponent)