import React, {createElement} from "react"
import {clsx} from "clsx"
import {Link} from "react-router-dom"

import { PropsDefaultWithChildren } from "@/shared/lib"
import {Loader, LoaderProps} from '@/shared/ui/Loader'

import { tags, views, sizes } from './model.ts'
import styles from './Button.module.scss'
import {TransitionFade} from "@/shared/ui/TransitionFade";

export type ButtonProps = PropsDefaultWithChildren<{
    tag?: (typeof tags)[number]
    href?: string
    to?: string
    view?: (typeof views)[number]
    size?: (typeof sizes)[number]

    isLoading?: boolean
    isDisabled?: boolean
    isWide?: boolean

    onClick: () => void
}>

const loaderColorMap: Record<
    NonNullable<ButtonProps['view']>,
    NonNullable<LoaderProps['color']>
> = {
    brand: 'white',
    secondary: 'white',
    critical: 'white',
    'critical-outline': 'critical',
    'secondary-flat': 'placeholder',
}

const ButtonComponent: React.FC<ButtonProps> = ({
    className,
    view = 'brand',
    size = 'l',
    children,
    isDisabled = false,
    isWide = true,
    isLoading = false,
    ...wrapperProps
}) => {
    const classes = clsx(
        [
            className,
            styles.root,
            styles[`view_${view}`],
            styles[`size_${size}`],
        ],
        {
            [styles['is-wide']]: isWide,
            [styles['is-loading']]: isLoading,
            [styles['is-disabled']]: isDisabled,
        }
    )

    return (
        <Wrapper
            {...wrapperProps}
            className={classes}
            isDisabled={isDisabled || isLoading}
        >
            <TransitionFade className={styles.loader}>
                {isLoading && (
                    <Loader
                        className={styles.loader}
                        color={loaderColorMap[view]}
                    />
                )}
            </TransitionFade>
            <div className={styles.content}>
                {children}
            </div>
        </Wrapper>
    )
}

const Wrapper: React.FC<
    Pick<
        ButtonProps,
        'tag' | 'className' | 'children' | 'onClick' | 'to' | 'href' | 'isDisabled'
    >
> = ({
    tag = 'button',
    className,
    children,
    onClick,
    to = '',
    href = '',
    isDisabled
}) => {
    if (tag === 'link') {
        return (
            <Link
                className={className}
                to={to}
            >
                {children}
            </Link>
        )
    }

    return createElement(
        tag,
        {
            className,
            ...(tag === 'button' && {
                disabled: isDisabled,
                onClick,
            }),
            ...(tag === 'a' && {
                href,
                target: '_blank',
                rel: 'noopener noreferrer',
            })
        },
        children,
    )
}

export const Button = React.memo(ButtonComponent)
