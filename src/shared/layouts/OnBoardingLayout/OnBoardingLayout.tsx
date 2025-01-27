import React from "react"

import styles from './OnBoardingLayout.module.scss'

export type OnBoardingLayoutProps = React.PropsWithChildren<{
    title: string
    description: string
    img: string
}>

const OnBoardingLayoutComponent: React.FC<OnBoardingLayoutProps> = ({
    title,
    description,
    img
}) => (
    <div className={styles.root}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <img
            className={styles.image}
            src={img}
            alt={'image'}
        />
    </div>
)

export const OnBoardingLayout = React.memo(OnBoardingLayoutComponent)