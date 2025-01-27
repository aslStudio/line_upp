import {useCallback, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {registrationModel} from "@/features/auth"

import {AuthLayout} from "@/shared/layouts"
import {Input} from "@/shared/ui/fields/Input"
import {Button} from "@/shared/ui/Button"
import {AuthPaths, RegistrationPaths, RootPaths} from "@/shared/lib"
import {useProjectNavigate} from "@/shared/lib/hooks"

import styles from './Phone.module.scss'
import {images} from "@/shared/assets/images";

export const RegistrationPhonePage = () => {
    const { navigate } = useProjectNavigate()

    const { phone, sendCodeState } = useSelector((state: RootState) => state.registration);
    const dispatch = useDispatch<AppDispatch>();

    const [isError, setIsError] = useState(false)

    const onClick = useCallback(() => {
        if (phone.length === 12) {
            dispatch(registrationModel.thunks.sendCodeThunk({ phone }))
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
                AuthPaths.REGISTRATION,
                RegistrationPaths.CODE
            )
        }
    }, [sendCodeState])

    return (
        <AuthLayout
            title={'Номер телефона'}
            description={'На него придёт код подтверждения'}
            img={images.Auth.Login}
        >
            <Input
                value={phone}
                placeholder={'+7 XXX XXX XX XX'}
                mask={'phone'}
                isError={isError}
                setValue={v => {
                    dispatch(registrationModel.actions.updatePhone(v))
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