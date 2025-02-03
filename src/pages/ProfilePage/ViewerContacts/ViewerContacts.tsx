import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";

import { AppDispatch, RootState } from "@/app/store.tsx";

import { contactsSearchModel } from "@/entities/user/model";
import { UserCell, UserCellList } from "@/entities/user/ui";

import { InputSearch } from "@/shared/ui/fields/InputSearch";
import { TransitionFade } from "@/shared/ui/TransitionFade";
import { Button } from "@/shared/ui/Button";
import { RootPaths, UserPaths } from "@/shared/lib";
import { useProjectNavigate } from "@/shared/lib/hooks";

import styles from "./ViewerContacts.module.scss";
import { useScreen } from "@/shared/lib/providers/ScreenProvider";
import { Icon } from "@/shared/ui/Icon";
import { ModalDesktopWrapper } from "@/shared/ui/ModalDesktop";
import { useModal } from "@/shared/ui/BottomSheet";
import { UserShowPage } from "@/pages/UserPage";

export const ViewerContacts = () => {
    const { navigate } = useProjectNavigate();
    const { isOpen, open, close } = useModal();
    const [currentIdCard, setCurrentIdCard] = useState<string | number>();
    const { searchValue, contacts, global, isPending } = useSelector(
        (state: RootState) => state.contactsSearch
    );
    const dispatch = useDispatch<AppDispatch>();
    const { isMobile } = useScreen();
    useEffect(() => {
        dispatch(
            contactsSearchModel.thunks.getContactsThunk({
                search: "",
            })
        );
    }, []);

    return (
        <div className={styles.root}>
            <div>
                {!isMobile && (
                    <div className={styles.contactsTitle}>
                        <h1>Контакты</h1>
                        <button
                            className={styles["blocked-contacts"]}
                            onClick={() => {
                                navigate(RootPaths.USER, UserPaths.BLOCKED);
                            }}
                        >
                            <p>Заблокированные контакты</p>
                            <Icon
                                className={styles.icon}
                                name={"chevron"}
                                view={"placeholder"}
                                size={22}
                            />
                        </button>
                    </div>
                )}
                <InputSearch
                    className={styles.field}
                    value={searchValue}
                    placeholder={"Поиск"}
                    isLoading={isPending}
                    onInput={(search) => {
                        dispatch(
                            contactsSearchModel.actions.setSearchValue(search)
                        );
                    }}
                    onSearch={(search) => {
                        dispatch(
                            contactsSearchModel.thunks.getContactsThunk({
                                search,
                            })
                        );
                    }}
                />
                <TransitionFade>
                    {!isPending && (
                        <>
                            <div className={styles.list}>
                                <p className={styles.label}>Ваши контакты</p>
                                <UserCellList
                                    render={(item) => (
                                        <UserCell
                                            {...item}
                                            onClick={(id) => {
                                                if (isMobile) {
                                                    navigate(
                                                        RootPaths.USER,
                                                        `${id}`
                                                    );
                                                } else {
                                                    console.log(id, item);
                                                    setCurrentIdCard(id);
                                                    open();
                                                }
                                            }}
                                        />
                                    )}
                                    list={contacts}
                                />
                            </div>
                            {global.length > 0 && (
                                <div className={styles.list}>
                                    <p className={styles.label}>
                                        Глобальный поиск
                                    </p>
                                    <UserCellList
                                        render={(item) => (
                                            <UserCell {...item} />
                                        )}
                                        list={global}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </TransitionFade>
                {isMobile &&
                    createPortal(
                        <div className={styles.buttons}>
                            <Button view={"brand-outline"} onClick={() => {}}>
                                Одноразовая ссылка приглашение
                            </Button>
                            <button
                                className={styles["blocked-contacts"]}
                                onClick={() => {
                                    navigate(RootPaths.USER, UserPaths.BLOCKED);
                                }}
                            >
                                Заблокированные контакты
                            </button>
                        </div>,
                        document.body
                    )}
            </div>
            {!isMobile && (
                <div className={styles.buttonDesktop}>
                    <Button view={"brand-outline"} onClick={() => {}}>
                        Одноразовая ссылка приглашение
                    </Button>
                </div>
            )}
            {!isMobile && (
                <ModalDesktopWrapper isOpen={isOpen} onClose={close}>
                    <UserShowPage
                        id={currentIdCard}
                        className={styles.modalWrapper}
                        closeMainModal={close}
                    />
                </ModalDesktopWrapper>
            )}
        </div>
    );
};
