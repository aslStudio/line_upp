import React from "react";

import { PropsDefault } from "@/shared/lib";

import styles from "./ViewerCell.module.scss";
import { clsx } from "clsx";
import {images} from "@/shared/assets/images";

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
