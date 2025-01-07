import React from "react"
import {clsx} from "clsx"

import {PropsDefault} from "@/shared/lib"
import {TextSkeleton} from "@/shared/ui/TextSkeleton";

import styles from '././InfoSection.module.scss'

export const InfoSectionSkeleton: React.FC<PropsDefault> = ({
    className
}) => {
    return (
        <div
            className={clsx(
                styles.root,
                className,
            )}
        >
            <TextSkeleton
                fontSize={14}
                lineHeight={18}
                view={'secondary'}
                widthRange={[0.6, 0.8]}
            />
            <div>
                <TextSkeleton
                    fontSize={15}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.6, 0.8]}
                />
                <TextSkeleton
                    fontSize={15}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.6, 0.8]}
                />
                <TextSkeleton
                    fontSize={15}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.6, 0.8]}
                />
            </div>
        </div>
    )
}