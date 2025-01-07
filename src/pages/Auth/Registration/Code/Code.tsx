import {useDispatch, useSelector} from "react-redux"
import {useCallback, useEffect, useState} from "react"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {registrationModel} from "@/features/auth"

import {useProjectNavigate, useTimer} from "@/shared/lib/hooks"
import {AuthLayout} from "@/shared/layouts"
import {InputCode} from "@/shared/ui/fields/InputCode"
import {Button} from "@/shared/ui/Button"
import {AuthPaths, RegistrationPaths, RootPaths} from "@/shared/lib"

import styles from './Code.module.scss'

export const RegistrationCodePage = () => {
    const { navigate } = useProjectNavigate()

    const { phone, confirmCodeState, sendCodeState } = useSelector((state: RootState) => state.registration);
    const dispatch = useDispatch<AppDispatch>();

    const {timer, initTimer} = useTimer()

    const [code, setCode] = useState('')
    const [isError, setIsError] = useState(false)

    const onClick = useCallback(() => {
        if (code.length === 6) {
            dispatch(registrationModel.thunks.confirmCodeThunk({
                phone,
                random_code: code,
            }))
        } else {
            setIsError(true)
        }
    }, [phone, code])

    const onRetry = useCallback(() => {
        if (timer === 0) {
            dispatch(registrationModel.thunks.sendCodeThunk({ phone }))
            initTimer(30)
        }
    }, [timer, initTimer])

    useEffect(() => {
        initTimer(30)
    }, [])

    useEffect(() => {
        if (confirmCodeState === 'error') {
            setIsError(true)
            // TODO: remove when back will work
            navigate(
                RootPaths.AUTH,
                AuthPaths.REGISTRATION,
                RegistrationPaths.PASSWORD
            )
        }
        if (confirmCodeState === 'success') {
            navigate(
                RootPaths.AUTH,
                AuthPaths.REGISTRATION,
                RegistrationPaths.PASSWORD
            )
        }
    }, [confirmCodeState]);

    return (
        <AuthLayout
            title={'Введите код из SMS'}
            description={'Код был отправлен на номер MOCK'}
        >
            <InputCode
                value={code}
                isError={isError}
                setValue={v => {
                    setCode(v)
                    setIsError(false)
                }}
            />
            <Button
                className={styles.submit}
                isLoading={confirmCodeState === 'pending'}
                onClick={onClick}
            >
                Далее
            </Button>
            <Button
                view={'secondary'}
                isLoading={sendCodeState === 'pending'}
                onClick={onRetry}
            >
                Отправить повторно <span className={styles.timer}>00:{timer > 9 ? timer : `0${timer}`}</span>
            </Button>
        </AuthLayout>
    )
}