import React, { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { clsx } from "clsx"

import {CalendarTypeTabs, useCommonHeaderContext} from "@/widgets/common"

import { PropsDefault } from "@/shared/lib"
import { TransitionFade } from "@/shared/ui/TransitionFade"
import { Icon } from "@/shared/ui/Icon"

import styles from './CommonHeader.module.scss'
import {useScreen} from "@/shared/lib/providers/ScreenProvider";

export type CommonHeaderProps = PropsDefault<{
    title?: string
    mainFilterValue?: string

    isFiltered: boolean

    FilterButton: React.ReactNode
    InputSearch: (p: {
        inputRef: React.RefObject<HTMLInputElement | null>
        isFocused: boolean
        onFocus: () => void
        onBlur: () => void
    }) => React.ReactNode
    FavoriteButton: React.ReactNode

    onClickMainFilter?: () => void
    onClearSearch?: () => void
}>

export const CommonHeader: React.FC<CommonHeaderProps> = ({
    className,

    title,
    mainFilterValue,

    isFiltered,

    FilterButton,
    InputSearch,
    FavoriteButton,

    onClickMainFilter,
    onClearSearch,
}) => {
    const { title: monthTitle } = useCommonHeaderContext()
    const { isDesktop } = useScreen()

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={clsx(styles.root, className)}>
            <div className={styles.wrapper}>
                {(title || mainFilterValue) && !isDesktop && (
                    <div className={styles.header}>
                        <p className={styles.title}>{title}</p>
                        {mainFilterValue && (
                            <div
                                className={styles['main-filter']}
                                onClick={onClickMainFilter}
                            >
                                <p>{mainFilterValue}</p>
                                <Icon
                                    name={'chevron'}
                                    view={'base'}
                                    size={20}
                                />
                            </div>
                        )}
                    </div>
                )}
                <AnimationWrapper
                    isFocused={isFocused && !isDesktop}
                    isFiltered={isFiltered}

                    SearchInput={InputSearch({
                        inputRef,
                        isFocused,
                        onFocus: () => setIsFocused(true),
                        onBlur: () => {
                            if (isDesktop) {
                                setIsFocused(false)
                            }
                        }
                    })}
                    FavoriteToggleButton={FavoriteButton}
                    ClearSearchButton={(
                        <button
                            onClick={() => {
                                onClearSearch?.()
                                inputRef.current?.blur()
                                setIsFocused(false)
                            }}
                        >
                            <Icon
                                className={styles['close-icon']}
                                key={'isFocused'}
                                name={'cross-icon'}
                                view={'placeholder'}
                                size={21}
                            />
                        </button>
                    )}
                    FilterModalButton={FilterButton}
                />
                <div className={styles.bottom}>
                    <p className={styles['bottom-title']}>{monthTitle}</p>
                    {isDesktop && mainFilterValue && (
                        <div
                            className={styles['main-filter']}
                            onClick={onClickMainFilter}
                        >
                            <p>{mainFilterValue}</p>
                            <Icon
                                name={'chevron'}
                                view={'brand'}
                                size={20}
                            />
                        </div>
                    )}
                    <CalendarTypeTabs className={styles.tabs} />
                </div>
            </div>
        </div>
    )
}

const AnimationWrapper: React.FC<{
    SearchInput: React.ReactNode
    FavoriteToggleButton: React.ReactNode
    ClearSearchButton: React.ReactNode
    FilterModalButton: React.ReactNode

    isFocused: boolean
    isFiltered: boolean
}> = ({
    SearchInput,
    FavoriteToggleButton,
    ClearSearchButton,
    FilterModalButton,
    isFocused,
    isFiltered,
}) => (
    <div className={styles['top-row']}>
        <motion.div
            className={styles.inner}
        >
            <AnimatePresence>
                <motion.div
                    style={{
                        width: 'calc(100% - 44px)'
                    }}
                    animate={{
                        width: isFocused
                            ? 'calc(100%)'
                            : 'calc(100% - 44px)'
                    }}
                    transition={{
                        delay: !isFocused ? 0.3 : 0,
                        duration: 0.3,
                        ease: 'easeInOut',
                    }}
                >
                    {SearchInput}
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                {!isFocused && (
                    <motion.div
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: "44px",
                        }}
                        exit={{
                            width: 0,
                        }}
                        transition={{
                            duration: 0.15,
                            ease: "easeInOut",
                            when: 'afterChildren'
                        }}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.15,
                                ease: "easeInOut",
                            }}
                        >
                            {FavoriteToggleButton}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
        <AnimatePresence>
            <motion.div
                className={styles['right-button']}
                style={{
                    width: '44px',
                }}
                animate={{
                    width: isFocused ? '44px' : isFiltered ? '73px' : '58px',
                    borderRadius: isFocused ? '24px' : '8px',
                    paddingLeft: isFocused ? '11.5px' : '16px',
                    paddingRight: isFocused ? '11.5px' : '16px',
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                }}
            >
                <TransitionFade>
                    {isFocused && ClearSearchButton}
                    {!isFocused && FilterModalButton}
                </TransitionFade>
            </motion.div>
        </AnimatePresence>
    </div>
)