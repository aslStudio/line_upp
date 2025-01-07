import {useCallback, useMemo} from "react"
import {Link, Outlet, useLocation} from "react-router-dom"

import {AuthPaths, CalendarPaths, OnBoardingPaths, RootPaths} from "@/shared/lib"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Button} from "@/shared/ui/Button"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './OnBoarding.module.scss'
import {onBoardingModel} from "@/shared/model";

export const OnBoarding = () => {
    const { navigate } = useProjectNavigate()
    const location = useLocation()

    const index = useMemo(() => {
        if (location.pathname.includes(OnBoardingPaths.CALENDAR)) {
            return 1
        }
        if (location.pathname.includes(OnBoardingPaths.PROJECTS)) {
            return 2
        }
        if (location.pathname.includes(OnBoardingPaths.PARTICIPANTS)) {
            return 3
        }
        return 4
    }, [location])

    const buttonText = useMemo(() => {
        if (index === 4) {
            return 'Начать!'
        }

        return 'Далее'
    }, [index])

    const onClick = useCallback(() => {
        switch (index) {
            case 1:
                navigate(
                    RootPaths.AUTH,
                    AuthPaths.ON_BOARDING,
                    OnBoardingPaths.PROJECTS
                )
                break
            case 2:
                navigate(
                    RootPaths.AUTH,
                    AuthPaths.ON_BOARDING,
                    OnBoardingPaths.PARTICIPANTS
                )
                break
            case 3:
                navigate(
                    RootPaths.AUTH,
                    AuthPaths.ON_BOARDING,
                    OnBoardingPaths.SAVE
                )
                break
            case 4:
                onBoardingModel.setIsOnBoarding()
                navigate(
                    RootPaths.CALENDAR,
                    CalendarPaths.WEEK,
                )
                break
        }
    }, [index, navigate])

    return (
        <div className={styles.root}>
            <p className={styles.counter}>
                {index}<span>/4</span>
            </p>
            <TransitionFade>
                <Outlet />
            </TransitionFade>
            <div className={styles.footer}>
                <Button
                    onClick={onClick}
                >
                    {buttonText}
                </Button>
                <Link
                    className={styles.skip}
                    to={`${RootPaths.CALENDAR}/${CalendarPaths.WEEK}`}
                    onClick={() => {
                        onBoardingModel.setIsOnBoarding()
                    }}
                >
                    Пропустить
                </Link>
            </div>
        </div>
    )
}