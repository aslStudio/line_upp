import React from "react";
import { clsx } from "clsx";

import { User } from "@/entities/user/model";

import { PropsDefault } from "@/shared/lib";
import { Icon } from "@/shared/ui/Icon";

import styles from "./UserProjectCell.module.scss";

export type UserProjectCellProps = PropsDefault<{
    id: number | string;
    avatar: string;
    name: string;
    onCreator?: (userId: User["id"]) => void;
    onRemove: (userId: User["id"]) => void;
}>;

export const UserProjectCell: React.FC<UserProjectCellProps> = ({
    className,
    id,
    avatar,
    name,
    onCreator,
    onRemove,
}) => {
    return (
        <div className={clsx(className, styles.root)}>
            <div className={styles.wrapper}>
                <div className={styles.avatar}>
                    <img src={avatar} alt={"avatar"} />
                </div>
                <p className={styles.name}>{name}</p>
            </div>
            <div className={styles.buttons}>
                {onCreator && (
                    <button
                        className={styles["button-make-creator"]}
                        onClick={() => {
                            onCreator?.(id);
                        }}
                    >
                        Назначить создателем
                    </button>
                )}
                <button
                    className={styles["button-remove"]}
                    onClick={() => {
                        onRemove(id);
                    }}
                >
                    <Icon name={"minus"} view={"dark"} size={22} />
                </button>
            </div>
        </div>
    );
};
