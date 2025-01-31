import {useCallback, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {loginModel} from "src/features/auth/model"

import {onBoardingModel} from "@/shared/model";
import {useProjectNavigate} from "@/shared/lib/hooks";
import {AuthLayout} from "@/shared/layouts"
import {Input} from "@/shared/ui/fields/Input"
import {Button} from "@/shared/ui/Button"
import {AuthPaths, CalendarPaths, OnBoardingPaths, RecoveryPaths, RegistrationPaths, RootPaths} from "@/shared/lib"

import styles from './Login.module.scss'
import {images} from "@/shared/assets/images";

export const Login = () => {
    const { navigate } = useProjectNavigate()

    const {
        state
    } = useSelector((state: RootState) => state.login)
    const dispatch = useDispatch<AppDispatch>()

    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')

    const [isPhoneError, setIsPhoneError] = useState(false)
    const [isPassError, setIsPassError] = useState(false)

    const onClick = useCallback(() => {
        if (phone.length === 12 && pass) {
            dispatch(loginModel.thunks.loginThunk({
                phone: phone,
                password: pass,
            }))
        }

        setIsPassError(!pass)
        setIsPhoneError(phone.length !== 12)
    }, [phone, pass])

    useEffect(() => {
        if (state === 'success') {
            if (onBoardingModel.getIsOnBoarding()) {
                navigate(RootPaths.CALENDAR, CalendarPaths.WEEK)
            } else {
                navigate(
                    RootPaths.AUTH,
                    AuthPaths.ON_BOARDING,
                    OnBoardingPaths.CALENDAR,
                )
            }
        }
        if (state === 'error') {
            setIsPhoneError(true)
            setIsPassError(true)
        }
    }, [state])

    return (
        <AuthLayout
            title={'Вход'}
            description={'Введите номер телефона и пароль'}
            img={images.Auth.Login}
        >
            <Input
                className={styles.field}
                value={phone}
                isError={isPhoneError}
                placeholder={'+7 XXX XXX XX XX'}
                mask={'phone'}
                setValue={v => {
                    setPhone(v)
                    setIsPhoneError(false)
                }}
            />
            <Input
                className={styles.field}
                placeholder={'Пароль'}
                type={'password'}
                isError={isPassError}
                value={pass}
                setValue={v => {
                    setPass(v)
                    setIsPassError(false)
                }}
            />
            <Link
                className={styles.recovery}
                to={`${RootPaths.AUTH}/${AuthPaths.RECOVERY}/${RecoveryPaths.PHONE}`}
            >
                Забыли пароль?
            </Link>
            <Button
                className={styles.button}
                isLoading={state === 'loading'}
                onClick={onClick}
            >
                Войти
            </Button>
            <Link
                className={styles.registration}
                to={`${RootPaths.AUTH}/${AuthPaths.REGISTRATION}/${RegistrationPaths.PHONE}`}
            >
                Нет аккаунта?
            </Link>
        </AuthLayout>
    )
}