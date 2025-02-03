import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch, RootState } from "@/app/store.tsx";

import { UserProfileBio, UserProfileInfoCell } from "@/entities/user/ui";
import { expandUserModel } from "@/entities/user/model";

import { TransitionFade } from "@/shared/ui/TransitionFade";
import { Loader } from "@/shared/ui/Loader";
import { Button } from "@/shared/ui/Button";
import { BottomSheet, useModal } from "@/shared/ui/BottomSheet";
import { useProjectNavigate } from "@/shared/lib/hooks";

import styles from "./UserShowPage.module.scss";
import { PropsDefault } from "@/shared/lib";
import clsx from "clsx";
import { useScreen } from "@/shared/lib/providers/ScreenProvider";
import { ModalDesktopWrapper } from "@/shared/ui/ModalDesktop";

export type UserShowProps = PropsDefault<{
    id?: string | number;
    closeMainModal?: () => void;
}>;

export const UserShowPage: React.FC<UserShowProps> = ({
    className,
    id = "",
    closeMainModal = () => {},
}) => {
    const params = useParams<{ id: string }>();
    const effectiveId = params.id || id;
    const { isMobile } = useScreen();

    const { goBack } = useProjectNavigate();

    const { data, isPending, isBlocking, isUnblocking } = useSelector(
        (state: RootState) => state.expandUser
    );
    const dispatch = useDispatch<AppDispatch>();

    const { isOpen, open, close } = useModal();

    useEffect(() => {
        if (effectiveId) {
            dispatch(
                expandUserModel.thunks.fetchExpandUser({
                    id: effectiveId,
                })
            );
        }
    }, [effectiveId, dispatch]);

    useEffect(() => {
        if (isBlocking === "success" || isUnblocking === "success") {
            dispatch(expandUserModel.actions.reset());
            if (isMobile) {
                goBack();
            } else {
                close();
                closeMainModal();
            }
        }
    }, [isBlocking, isUnblocking]);

    return (
        <TransitionFade className={clsx(styles.root, className)}>
            {isPending && (
                <Loader
                    key={"Loader"}
                    className={styles.loader}
                    size={"m"}
                    color={"brand"}
                />
            )}
            {!isPending && (
                <>
                    <div key={"Content"} className={styles.wrapper}>
                        <UserProfileBio
                            className={styles.bio}
                            avatar={data.avatar}
                            username={data.nickname}
                            name={data.name}
                            phone={data.phone}
                            isHiddenName={!data.isShowName}
                            isHiddenPhone={!data.isShowPhone}
                        />
                        {data.isShowAbout && (
                            <UserProfileInfoCell
                                className={styles.field}
                                label={"О себе"}
                                value={data.about}
                                isHidden={!data.isShowAbout}
                            />
                        )}
                        {data.isShowEmail && (
                            <UserProfileInfoCell
                                className={styles.field}
                                label={"О себе"}
                                value={data.email}
                                isHidden={!data.isShowEmail}
                            />
                        )}
                        {data.isShowEmail && (
                            <UserProfileInfoCell
                                className={styles.field}
                                label={"О себе"}
                                value={data.email}
                                isHidden={!data.isShowEmail}
                            />
                        )}
                        {data.isShowTelegram && (
                            <UserProfileInfoCell
                                className={styles.field}
                                label={"О себе"}
                                value={data.telegram}
                                isHidden={!data.isShowTelegram}
                            />
                        )}
                        <Button
                            className={styles.button}
                            view={data.isBlocked ? "brand" : "critical"}
                            isLoading={
                                isBlocking === "pending" ||
                                isUnblocking === "pending"
                            }
                            onClick={() => {
                                if (!data.isBlocked) {
                                    open();
                                } else {
                                    dispatch(
                                        expandUserModel.thunks.unblockUser({
                                            id: data.id,
                                        })
                                    );
                                }
                            }}
                        >
                            {data.isBlocked
                                ? "Разблокировать"
                                : "Заблокировать"}
                        </Button>
                    </div>
                    {isMobile ? (
                        <BottomSheet
                            isOpen={isOpen}
                            view={"base"}
                            setIsOpen={close}
                        >
                            <p className={styles.title}>
                                Вы уверены, что хотите <br /> заблокировать{" "}
                                {data.nickname}?
                            </p>
                            <p className={styles.description}>
                                Он не сможет участвовать в ваших <br />{" "}
                                проектах, событиях, а также <br /> приглашать
                                вас в свои
                            </p>
                            <div className={styles.buttons}>
                                <Button
                                    view={"critical"}
                                    size={"m"}
                                    isLoading={isBlocking === "pending"}
                                    onClick={() => {
                                        if (data.id) {
                                            dispatch(
                                                expandUserModel.thunks.blockUser(
                                                    {
                                                        id: data.id,
                                                    }
                                                )
                                            );
                                        }
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
                        </BottomSheet>
                    ) : (
                        <ModalDesktopWrapper
                            className={styles.modalDesktop}
                            isOpen={isOpen}
                            onClose={close}
                        >
                            <p className={styles.title}>
                                Вы уверены, что хотите <br /> заблокировать{" "}
                                {data.nickname}?
                            </p>
                            <p className={styles.description}>
                                Он не сможет участвовать в ваших <br />{" "}
                                проектах, событиях, а также <br /> приглашать
                                вас в свои
                            </p>
                            <div className={styles.buttons}>
                                <Button
                                    view={"critical"}
                                    size={"m"}
                                    isLoading={isBlocking === "pending"}
                                    onClick={() => {
                                        if (data.id) {
                                            dispatch(
                                                expandUserModel.thunks.blockUser(
                                                    {
                                                        id: data.id,
                                                    }
                                                )
                                            );
                                        }
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
                        </ModalDesktopWrapper>
                    )}
                </>
            )}
        </TransitionFade>
    );
};
