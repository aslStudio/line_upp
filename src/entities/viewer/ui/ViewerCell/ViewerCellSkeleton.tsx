import React from "react";
import { clsx } from "clsx";
import { PropsDefault } from "@/shared/lib";
import { TextSkeleton } from "@/shared/ui/TextSkeleton";
import styles from "./ViewerCell.module.scss";
import { SkeletonWrapper } from "@/shared/ui/SkeletonWrapper";

type LineMode = "single" | "double";

export const ViewerCellSkeleton: React.FC<
    PropsDefault<{ lineMode?: LineMode }>
> = ({ className, lineMode = "double" }) => (
    <SkeletonWrapper>
        <div className={clsx(styles.root, className)}>
            <div className={styles.avatar} />
            <div className={styles.wrapper}>
                {lineMode == "double" && (
                    <TextSkeleton
                        className={styles.title}
                        fontSize={15}
                        lineHeight={22}
                        view={"secondary"}
                        widthRange={[0.5, 0.7]}
                    />
                )}
                <TextSkeleton
                    className={styles.name}
                    fontSize={13}
                    lineHeight={18}
                    view={"secondary"}
                    widthRange={[0.5, 0.7]}
                />
            </div>
        </div>
    </SkeletonWrapper>
);
