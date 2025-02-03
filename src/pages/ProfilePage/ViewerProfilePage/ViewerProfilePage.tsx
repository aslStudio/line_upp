import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store.tsx";

import { viewerModel } from "@/entities/viewer/model";

import { ProfileInfo } from "./ProfileInfo";
import { LogoutButton } from "@/features/user/ui/LogoutButton";
import { RemoveButton } from "@/features/user/ui/RemoveButton";

import styles from "./ViewerProfilePage.module.scss";
import { ProfileSettings } from "@/features/user/ui/ProfileSettings";

export const ViewerProfilePage = () => {
    const { state, data } = useSelector((state: RootState) => state.viewer);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!data.name) {
            dispatch(viewerModel.thunks.getViewerThunk());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>Профиль</h1>
            <ProfileInfo className={styles.info} />
            {state === "success" && (
                <>
                    <ProfileSettings className={styles.settings} />
                    <LogoutButton />
                    <RemoveButton />
                </>
            )}
        </div>
    );
};
