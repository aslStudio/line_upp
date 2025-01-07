import React from 'react'
import { clsx } from 'clsx'

import { PropsDefault } from '@/shared/lib'
import '@/shared/assets/icon-font/icons.scss'

import { names, views } from './model.ts'
import styles from './Icon.module.scss'

export type IconProps = PropsDefault<{
    name: (typeof names)[number]
    size: number
    view?: (typeof views)[number]
}>;

export const Icon: React.FC<IconProps> = ({
    className,
    name,
    size,
    view,
}) => {
    return (
        <i
            className={clsx(
                className,
                styles.root,
                `icon-${name}`,
                styles[`view_${view}`]
            )}
            style={{fontSize: size}}
        />
    );
};
