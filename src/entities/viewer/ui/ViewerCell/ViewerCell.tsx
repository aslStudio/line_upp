import React from "react"
import { clsx } from "clsx"

import { PropsDefault } from "@/shared/lib"
import { images } from "@/shared/assets/images"

import styles from "./ViewerCell.module.scss"

export type ViewerCellProps = PropsDefault<{
    avatar: string;
    username: string;
    name: string;
    compact?: boolean;
    isActive?: boolean;
}>;

export const ViewerCell: React.FC<ViewerCellProps> = ({
    className,
    avatar,
    username,
    name,
    compact = false,
    isActive = false,
}) => (
    <div className={clsx(styles.root, className)}>
        <div className={styles.avatar}>
            <img src={avatar ?? images.user} alt={"avatar"} />
        </div>
        <div>
            {!compact && <p className={styles.title}>{username}</p>}
            <p
                className={clsx(
                    styles.name,
                    { [styles.compact]: compact },
                    { [styles.active]: isActive }
                )}
            >
                {name}
            </p>
        </div>
    </div>
);
