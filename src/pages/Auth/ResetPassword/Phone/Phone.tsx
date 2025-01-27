import {useCallback, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import { resetPasswordModel } from "@/features/auth"

import { AuthLayout } from "@/shared/layouts"
import { Input } from "@/shared/ui/fields/Input"
import { Button } from "@/shared/ui/Button"
import { useProjectNavigate } from "@/shared/lib/hooks"
import {AuthPaths, RecoveryPaths, RootPaths} from "@/shared/lib"

import styles from './Phone.module.scss'
import {images} from "@/shared/assets/images";

export const ResetPasswordPhonePage = () => {
    const { navigate } = useProjectNavigate()

    const { phone, sendCodeState } = useSelector((state: RootState) => state.resetPassword);
    const dispatch = useDispatch<AppDispatch>();

    const [isError, setIsError] = useState(false)

    const onClick = useCallback(() => {
        if (phone.length === 12) {
            dispatch(resetPasswordModel.thunks.sendCodeThunk({ phone }))
        } else {
            setIsError(true)
        }
    }, [phone])

    useEffect(() => {
        if (sendCodeState === 'error') {
            setIsError(true)
        }
        if (sendCodeState === 'success') {
            setIsError(false)
            navigate(
                RootPaths.AUTH,
                AuthPaths.RECOVERY,
                RecoveryPaths.CODE,
            )
        }
    }, [sendCodeState])

    return (
        <AuthLayout
            title={'Восстановления пароля'}
            description={'Введите номер телефона, к которому  привязан аккаунт. На него придёт  код подтверждения'}
            img={images.Auth.Login}
        >
            <Input
                value={phone}
                placeholder={'+7 XXX XXX XX XX'}
                mask={'phone'}
                isError={isError}
                setValue={v => {
                    dispatch(resetPasswordModel.actions.updatePhone(v))
                    setIsError(false)
                }}
            />
            <Button
                className={styles.button}
                isLoading={sendCodeState === 'pending'}
                onClick={onClick}
            >
                Получить код
            </Button>
        </AuthLayout>
    )
}