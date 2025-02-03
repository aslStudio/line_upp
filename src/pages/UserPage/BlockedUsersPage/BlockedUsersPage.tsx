import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store.tsx";

import { UserCellList, UserProjectCell } from "@/entities/user/ui";
import { blockedUsersModel } from "@/entities/user/model";

import { TransitionFade } from "@/shared/ui/TransitionFade";
import { Loader } from "@/shared/ui/Loader";
import { usersApi } from "@/shared/api/users";

import styles from "./BlockedUsersPage.module.scss";
import { useProjectNavigate } from "@/shared/lib/hooks";

export const BlockedUsersPage = () => {
    const { isPending, data } = useSelector(
        (state: RootState) => state.blockedUsers
    );
    const dispatch = useDispatch<AppDispatch>();
    const { goBack } = useProjectNavigate();
    useEffect(() => {
        dispatch(blockedUsersModel.thunks.fetchBlockedUsersThunks());
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.titleContent}>
                <h1 className={styles.title}>Заблокированные контакты</h1>
                <button
                    className={styles["blocked-contacts"]}
                    onClick={() => {
                        goBack();
                    }}
                >
                    Назад
                </button>
            </div>
            <TransitionFade className={styles.wrapper}>
                {isPending && (
                    <Loader key={"Loader"} color={"brand"} size={"m"} />
                )}
                {!isPending && (
                    <UserCellList
                        className={styles.list}
                        list={data}
                        render={(item) => (
                            <UserProjectCell
                                {...item}
                                onRemove={async () => {
                                    await usersApi.unblockUser({
                                        id: item.id,
                                    });
                                    dispatch(
                                        blockedUsersModel.thunks.fetchBlockedUsersThunks()
                                    );
                                }}
                            />
                        )}
                    />
                )}
            </TransitionFade>
        </div>
    );
};
