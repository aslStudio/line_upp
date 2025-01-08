import React, {useState} from 'react'
import { Drawer } from 'vaul'
import {clsx} from "clsx"

import { views } from './model.ts'
import styles from './BottomSheet.module.scss'

export type BottomSheetProps = React.PropsWithChildren<{
    isOpen: boolean
    isDismissible?: boolean
    isModal?: boolean
    isUnderTabBar?: boolean
    isDefaultOpen?: boolean

    withOverlay?: boolean
    view?: typeof views[number]

    HeaderComponent?: React.ReactNode

    snapPoints?: (string | number)[]

    setIsOpen: (v: boolean) => void
}>

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
    isOpen,
    isDismissible = true,
    isDefaultOpen = false,
    isModal = true,
    snapPoints = [1],
    withOverlay = true,
    isUnderTabBar = false,
    HeaderComponent,
    view = 'secondary',
    children,
    setIsOpen,
}) => {
    const [snap, setSnap] = useState<string | number | null>(snapPoints[0])

    return (
        <Drawer.Root
            noBodyStyles
            open={isOpen}
            defaultOpen={isDefaultOpen}
            modal={isModal}
            dismissible={isDismissible}
            repositionInputs={!isModal}
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            setActiveSnapPoint={setSnap}
            onOpenChange={setIsOpen}
        >
            <Drawer.Portal>
                {withOverlay && (
                    <Drawer.Overlay className={clsx(
                        styles.overlay,
                        {
                            [styles['is-under-tab-bar']]: isUnderTabBar,
                        }
                    )} />
                )}
                <Drawer.Content
                    className={clsx(
                        styles.root,
                        styles[`view_${view}`],
                        {
                            [styles['is-under-tab-bar']]: isUnderTabBar,
                            [styles['with-max-height']]: !snapPoints.length
                        }
                    )}
                >
                    <div className={styles.wrapper}>
                        <Drawer.Title>
                            <div className={styles.header} />
                            {HeaderComponent}
                        </Drawer.Title>
                        <div className={styles.container}>{children}</div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export const BottomSheet = React.memo(BottomSheetComponent)