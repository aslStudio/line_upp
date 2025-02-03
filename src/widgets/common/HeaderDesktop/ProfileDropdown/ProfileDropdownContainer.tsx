import { RootState } from "@/app/store";
import { ViewerCell, ViewerCellSkeleton } from "@/entities/viewer/ui";
import { useSelector } from "react-redux";
import styles from "./profileDropdownContainer.module.scss";
import { TransitionFade } from "@/shared/ui/TransitionFade";
import { useRef, useState } from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import { useOnClickOutside } from "@/shared/lib/hooks";
import { useLocation } from "react-router-dom";

export const ProfileDropdownContainer = () => {
    const { state, data } = useSelector((state: RootState) => state.viewer);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const activeProfile = location.pathname.includes("profile");
    useOnClickOutside(containerRef, () => {
        if (isOpenModal) setIsOpenModal(false);
    });

    return (
        <TransitionFade className={styles.root}>
            {state === "success" ? (
                <div ref={containerRef}>
                    <div onClick={() => setIsOpenModal((prev) => !prev)}>
                        <ViewerCell
                            className={styles.compact}
                            avatar={data.avatar}
                            username={data.nickname}
                            name={data.name}
                            compact={true}
                            isActive={isOpenModal || activeProfile}
                        />
                    </div>
                    {isOpenModal && <ProfileDropdown />}
                </div>
            ) : (
                <>
                    <ViewerCellSkeleton
                        lineMode="single"
                        className={styles.compactSkeleton}
                    />
                </>
            )}
        </TransitionFade>
    );
};
