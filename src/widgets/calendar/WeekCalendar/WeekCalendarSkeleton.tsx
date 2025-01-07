import React from "react"

import {PropsDefault} from "@/shared/lib"

import styles from './WeekCalendar.module.scss'
import {clsx} from "clsx";
import {TextSkeleton} from "@/shared/ui/TextSkeleton";
import {getRandomInt} from "@/shared/lib/number.ts";
import {EventWeekCardSkeleton} from "@/entities/events/ui";
import {SkeletonWrapper} from "@/shared/ui/SkeletonWrapper";

export const WeekCalendarSkeleton: React.FC<PropsDefault> = ({
    className
}) => (
    <SkeletonWrapper className={className}>
        <div className={styles.header}>
            {Array(10).fill(1).map((_, key) => (
                <div
                    key={key}
                    className={clsx(
                        styles['header-item'],
                    )}
                >
                    <TextSkeleton
                        fontSize={13}
                        lineHeight={22}
                        widthRange={[0.5, 0.7]}
                        view={'secondary'}
                    />
                    <div className={styles.colors}>
                        {Array(3).fill(1).map((_, key) => (
                            <span
                                key={key}
                                style={{
                                    backgroundColor: 'var(--color-secondary)',
                                }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div className={styles.wrapper}>
            {Array(10).fill(1).map((_, key) => (
                <div
                    key={key}
                    className={styles.column}
                >
                    <div className={styles.head}>
                        <TextSkeleton
                            view={'secondary'}
                            fontSize={15}
                            lineHeight={20}
                            widthRange={[0.5, 0.7]}
                        />
                        <div className={styles['column-content']}>
                            {Array(getRandomInt(1, 3)).map((_, key) => (
                                <EventWeekCardSkeleton
                                    key={key}
                                    className={styles['event-card']}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </SkeletonWrapper>
)