import { useSelector } from "react-redux";

import { RootState } from "@/app/store.tsx";

import { UserProfileBio, UserProfileInfoCell } from "@/entities/user/ui";

import { SecuritySettings } from "./SecuritySettings";
import styles from "./ViewerSecurityPage.module.scss";
import { useMemo } from "react";
import { Button } from "@/shared/ui/Button";
import { useProjectNavigate } from "@/shared/lib/hooks";

export const ViewerSecurityPage = () => {
    const { data } = useSelector((state: RootState) => state.viewer);
    const { goBack } = useProjectNavigate();
    const isClosedProfile = useMemo(() => {
        return (
            !data.isShowName &&
            !data.isShowAbout &&
            !data.isShowEmail &&
            !data.isShowPhone &&
            !data.isShowTelegram
        );
    }, [
        data.isShowName,
        data.isShowAbout,
        data.isShowEmail,
        data.isShowPhone,
        data.isShowTelegram,
    ]);

    return (
        <div className={styles.root}>
            <div className={styles.fullBioInfo}>
                <p className={styles.subscription}>
                    Так выглядит ваш профиль для других
                </p>
                <UserProfileBio
                    className={styles.bio}
                    avatar={data.avatar}
                    username={data.nickname}
                    name={data.name}
                    phone={data.phone}
                    isHiddenPhone={!data.isShowPhone}
                    isHiddenName={!data.isShowName}
                />
                {!isClosedProfile && (
                    <div className={styles.infoAll}>
                        <UserProfileInfoCell
                            className={styles.field}
                            label={"О себе"}
                            value={data.about}
                            isHidden={!data.isShowAbout}
                        />
                        <UserProfileInfoCell
                            className={styles.field}
                            label={"Электронная почта"}
                            value={data.email}
                            isHidden={!data.isShowEmail}
                        />
                        <UserProfileInfoCell
                            className={styles.field}
                            label={"Телеграм"}
                            value={data.telegram}
                            isHidden={!data.isShowTelegram}
                        />
                    </div>
                )}
            </div>

            <SecuritySettings className={styles.securitySettings} />
            <Button
                className={styles.btnSave}
                size={"m"}
                onClick={() => {
                    goBack();
                }}
            >
                Сохранить
            </Button>
        </div>
    );
};
