import React from "react";
import { clsx } from "clsx";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store.tsx";

import {
    ViewerCell,
    ViewerCellSkeleton,
    ViewerTelegramCell,
    ViewerTelegramCellSkeleton,
} from "@/entities/viewer/ui";

import { ProfilePaths, PropsDefault, RootPaths } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { TransitionFade } from "@/shared/ui/TransitionFade";
import { useProjectNavigate } from "@/shared/lib/hooks";

import styles from "./ProfileInfo.module.scss";

export const ProfileInfo: React.FC<PropsDefault> = ({ className }) => {
    const { navigate } = useProjectNavigate();

    const { state, data } = useSelector((state: RootState) => state.viewer);

    return (
        <div className={clsx(styles.root, className)}>
            <TransitionFade className={styles.root}>
                {state === "success" ? (
                    <>
                        <ViewerCell
                            avatar={data.avatar}
                            username={data.nickname}
                            name={data.name}
                        />
                        {data.telegram && (
                            <ViewerTelegramCell telegram={data.telegram} />
                        )}
                    </>
                ) : (
                    <>
                        <ViewerCellSkeleton />
                        <ViewerTelegramCellSkeleton />
                    </>
                )}
            </TransitionFade>
            <Button
                size={"m"}
                onClick={() => {
                    navigate(RootPaths.PROFILE, ProfilePaths.UPDATE);
                }}
            >
                Редактировать профиль
            </Button>
        </div>
    );
};
