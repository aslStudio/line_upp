import React from "react";
import clsx from "clsx";

import { usePatchViewer } from "@/features/viewer/hooks";
import { useThemeProvider } from "@/shared/lib/providers";
import { FAQPaths, ProfilePaths, PropsDefault, RootPaths } from "@/shared/lib";

import styles from "./ProfileSettings.module.scss";
import { CardToggle } from "@/shared/ui/CardToggle";
import { images } from "@/shared/assets/images";
import { Icon } from "@/shared/ui/Icon";
import { useProjectNavigate } from "@/shared/lib/hooks";

export const ProfileSettings: React.FC<PropsDefault> = ({ className }) => {
    const { navigate } = useProjectNavigate();
    const {
        data,
        isLoadingReminding,
        isLoadingNickname,
        updateRemindingAvailable,
        updateNicknameSearchAvailable,
    } = usePatchViewer();
    const { theme, setTheme } = useThemeProvider();

    return (
        <div className={className}>
            <p className={styles.title}>Настройки</p>
            <CardToggle
                className={styles.item}
                title="Тёмная тема"
                isLoading={false}
                value={theme === "dark"}
                setValue={(v) => setTheme(v ? "dark" : "light")}
            />
            <CardToggle
                className={styles.item}
                title="Найти меня по никнейму"
                isLoading={isLoadingNickname}
                value={data.canBeFindByNickname}
                setValue={updateNicknameSearchAvailable}
            />
            <CardToggle
                className={styles.item}
                title="Предупреждать о ближайших событиях при ключевых действиях"
                isLoading={isLoadingReminding}
                value={data.needReminding}
                setValue={updateRemindingAvailable}
            />
            <div className={styles.section}>
                <div className={styles.row}>
                    <img
                        className={styles.image}
                        src={images.Viewer.Favorite}
                        alt="favorite"
                    />
                    <div
                        className={clsx(
                            styles["row-wrapper"],
                            styles["with-border"]
                        )}
                    >
                        <p>Избранное</p>
                        <Icon
                            className={styles.icon}
                            name="chevron"
                            view="placeholder"
                            size={20}
                        />
                    </div>
                </div>
                <div
                    className={styles.row}
                    onClick={() =>
                        navigate(RootPaths.PROFILE, ProfilePaths.CONTACTS)
                    }
                >
                    <img
                        className={styles.image}
                        src={images.Viewer.Contacts}
                        alt="favorite"
                    />
                    <div
                        className={clsx(
                            styles["row-wrapper"],
                            styles["with-border"]
                        )}
                    >
                        <p>Контакты</p>
                        <Icon
                            className={styles.icon}
                            name="chevron"
                            view="placeholder"
                            size={20}
                        />
                    </div>
                </div>
                <div
                    className={styles.row}
                    onClick={() => navigate(RootPaths.FAQ, FAQPaths.MAIN)}
                >
                    <img
                        className={styles.image}
                        src={images.Viewer.Support}
                        alt="favorite"
                    />
                    <div
                        className={clsx(
                            styles["row-wrapper"],
                            styles["with-border"]
                        )}
                    >
                        <p>Поддержка</p>
                        <Icon
                            className={styles.icon}
                            name="chevron"
                            view="placeholder"
                            size={20}
                        />
                    </div>
                </div>
                <div
                    className={styles.row}
                    onClick={() =>
                        navigate(RootPaths.PROFILE, ProfilePaths.SECURITY)
                    }
                >
                    <img
                        className={styles.image}
                        src={images.Viewer.Security}
                        alt="favorite"
                    />
                    <div
                        className={clsx(
                            styles["row-wrapper"],
                            styles["with-border"]
                        )}
                    >
                        <p>Безопастность</p>
                        <Icon
                            className={styles.icon}
                            name="chevron"
                            view="placeholder"
                            size={20}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <img
                        className={styles.image}
                        src={images.Viewer.Subscribe}
                        alt="favorite"
                    />
                    <div className={clsx(styles["row-wrapper"])}>
                        <p>Подписка</p>
                        <Icon
                            className={styles.icon}
                            name="chevron"
                            view="placeholder"
                            size={20}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
