import { useSelector } from "react-redux";
import styles from "./ProfileDropdown.module.scss";
import { RootState } from "@/app/store";
import { ViewerCell, ViewerTelegramCell } from "@/entities/viewer/ui";
import { Button } from "@/shared/ui/Button";
import { useProjectNavigate } from "@/shared/lib/hooks";
import { ProfilePaths, PropsDefault, RootPaths } from "@/shared/lib";
import { LogoutButton } from "@/features/user/ui/LogoutButton";
import { RemoveButton } from "@/features/user/ui/RemoveButton";
import { ProfileSettings } from "@/features/user/ui/ProfileSettings";
import { AnimatePresence, motion } from "framer-motion";

type PropsProfileDropDown = PropsDefault<{
    isOpenModal?: boolean;
}>;

export const ProfileDropdown: React.FC<PropsProfileDropDown> = ({
    isOpenModal,
}) => {
    const { state, data } = useSelector((state: RootState) => state.viewer);
    const { navigate } = useProjectNavigate();
    return (
        <AnimatePresence>
            {isOpenModal && (
                <motion.div
                    key={"dropdown"}
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
                    {data.telegram && (
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
                    )}

                    <Button
                        className={styles.editProfile}
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
                            <LogoutButton className={styles.logOutBtn} />
                            <RemoveButton className={styles.removeBtn} />
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
