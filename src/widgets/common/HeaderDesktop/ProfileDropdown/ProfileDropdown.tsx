import { useSelector } from "react-redux";
import styles from "./ProfileDropdown.module.scss";
import { RootState } from "@/app/store";
import { ViewerCell, ViewerTelegramCell } from "@/entities/viewer/ui";
import { Button } from "@/shared/ui/Button";
import { useProjectNavigate } from "@/shared/lib/hooks";
import { ProfilePaths, RootPaths } from "@/shared/lib";
import { LogoutButton } from "@/features/user/ui/LogoutButton";
import { RemoveButton } from "@/features/user/ui/RemoveButton";
import { ProfileSettings } from "@/features/user/ui/ProfileSettings";
import { AnimatePresence, motion } from "framer-motion";

export const ProfileDropdown = () => {
    const { state, data } = useSelector((state: RootState) => state.viewer);
    const { navigate } = useProjectNavigate();
    return (
        <AnimatePresence>
            <motion.div
                className={styles.root}
                initial={{
                    opacity: 0,
                    y: -100,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: -100,
                }}
            >
                <ViewerCell
                    className={styles.profile}
                    avatar={data.avatar}
                    username={data.nickname}
                    name={data.name}
                />
                <div className={styles.copy}>
                    <ViewerTelegramCell
                        className={styles.telegram}
                        telegram={data.telegram}
                    />
                    <ViewerTelegramCell
                        className={styles.telegram}
                        telegram={data.telegram}
                    />
                </div>
                <Button
                    size={"m"}
                    onClick={() => {
                        navigate(RootPaths.PROFILE, ProfilePaths.UPDATE);
                    }}
                >
                    Редактировать профиль
                </Button>
                {state === "success" && (
                    <>
                        <ProfileSettings />
                        <LogoutButton />
                        <RemoveButton />
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
};
