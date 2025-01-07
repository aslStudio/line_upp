import { Outlet } from "react-router-dom"

import { useRouteTransitionContext } from "@/shared/lib/providers/RouteTransitionProvider"

import styles from './Auth.module.scss'
import {useTelegram} from "@/shared/lib/hooks/useTelegram.ts";
import {useEffect} from "react";

export const AuthPage = () => {
    const {
        authClass,
    } = useRouteTransitionContext()
    const { setHeaderColor } = useTelegram()

    useEffect(() => {
        setHeaderColor('#1E1E1E')
    }, [])

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div
                    className={authClass}
                >
                    <Outlet />
                </div>    
            </div>
        </div>
    )
}