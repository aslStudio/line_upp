import {useProjectNavigate, useTimer} from "@/shared/lib/hooks";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/store.tsx";
import {useCallback, useEffect, useState} from "react";
import {resetPasswordModel} from "@/features/auth";
import {AuthPaths, formatPhoneNumber, RecoveryPaths, RootPaths} from "@/shared/lib";
import {AuthLayout} from "@/shared/layouts";
import {InputCode} from "@/shared/ui/fields/InputCode";
import {Button} from "@/shared/ui/Button";
import styles from "./Code.module.scss";
import {images} from "@/shared/assets/images";

export const ResetPasswordCodePage = () => {
    const { navigate } = useProjectNavigate()

    const { phone, confirmCodeState, sendCodeState } = useSelector((state: RootState) => state.resetPassword);
    const dispatch = useDispatch<AppDispatch>();

    const {timer, initTimer} = useTimer()

    const [code, setCode] = useState('')
    const [isError, setIsError] = useState(false)

    const onClick = useCallback(() => {
        if (code.length === 6) {
            dispatch(resetPasswordModel.thunks.confirmCodeThunk({
                phone,
                random_code: code,
            }))
        } else {
            setIsError(true)
        }
    }, [phone, code])

    const onRetry = useCallback(() => {
        if (timer === 0) {
            dispatch(resetPasswordModel.thunks.sendCodeThunk({ phone: phone.replace('+', '') }))
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
                AuthPaths.RECOVERY,
                RecoveryPaths.PASSWORD
            )
        }
        if (confirmCodeState === 'success') {
            navigate(
                RootPaths.AUTH,
                AuthPaths.RECOVERY,
                RecoveryPaths.PASSWORD
            )
        }
    }, [confirmCodeState]);

    return (
        <AuthLayout
            title={'Введите код из SMS'}
            description={`Код был отправлен на номер ${formatPhoneNumber(phone)}`}
            img={images.Auth.Login}
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