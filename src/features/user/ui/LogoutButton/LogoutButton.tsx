import React from "react";

import { useLogout } from "@/features/viewer/hooks";

import { PropsDefault } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { BottomSheet, useModal } from "@/shared/ui/BottomSheet";
import styles from "./LogoutButton.module.scss";
import { useScreen } from "@/shared/lib/providers/ScreenProvider";
import { ModalDesktopWrapper } from "@/shared/ui/ModalDesktop";

export const LogoutButton: React.FC<PropsDefault> = ({ className }) => {
    const { logout } = useLogout();
    const { isOpen, open, close } = useModal();
    const { isMobile } = useScreen();
    return (
        <>
            <Button
                className={className}
                view={"secondary_transparent"}
                size={"m"}
                onClick={open}
            >
                Выйти из аккаунта
            </Button>
            {isMobile && (
                <BottomSheet isOpen={isOpen} setIsOpen={close}>
                    <p className={styles.title}>
                        Вы уверены, что хотите <br /> выйти из аккаунта?
                    </p>
                    <div className={styles.buttons}>
                        <Button
                            view={"critical"}
                            size={"m"}
                            onClick={() => {
                                logout();
                                close();
                            }}
                        >
                            Выйти
                        </Button>
                        <Button view={"secondary"} size={"m"} onClick={close}>
                            Отмена
                        </Button>
                    </div>
                </BottomSheet>
            )}
            {!isMobile && (
                <ModalDesktopWrapper isOpen={isOpen} onClose={close}>
                    <div className={styles.mainContent}>
                        <p className={styles.title}>
                            Вы уверены, что хотите <br /> выйти из аккаунта?
                        </p>
                        <div className={styles.buttons}>
                            <Button
                                view={"critical"}
                                size={"m"}
                                onClick={() => {
                                    logout();
                                    close();
                                }}
                            >
                                Да
                            </Button>
                            <Button
                                view={"secondary"}
                                size={"m"}
                                onClick={close}
                            >
                                Назад
                            </Button>
                        </div>
                    </div>
                </ModalDesktopWrapper>
            )}
        </>
    );
};
