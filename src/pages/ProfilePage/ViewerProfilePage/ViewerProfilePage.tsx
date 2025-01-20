import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {viewerModel} from "@/entities/viewer/model"

import { ProfileInfo } from './ProfileInfo'
import { ProfileSettings } from './ProfileSettings'
import { LogoutButton } from './LogoutButton'
import { RemoveButton } from './RemoveButton'

import styles from './ViewerProfilePage.module.scss'

export const ViewerProfilePage = () => {
    const {
        state
    } = useSelector((state: RootState) => state.viewer)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(viewerModel.thunks.getViewerThunk())
    }, []);

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>Профиль</h1>
            <ProfileInfo
                className={styles.info}
            />
            {state === 'success' && (
                <>
                    <ProfileSettings
                        className={styles.settings}
                    />
                    <LogoutButton />
                    <RemoveButton />
                </>
            )}
        </div>
    )
}