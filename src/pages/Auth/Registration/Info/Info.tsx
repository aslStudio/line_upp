import {useCallback, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {registrationModel} from "@/features/auth"

import {AuthLayout} from "@/shared/layouts"
import {Input} from "@/shared/ui/fields/Input"
import {Button} from "@/shared/ui/Button"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {AuthPaths, RootPaths} from "@/shared/lib"

import styles from './Info.module.scss'
import {images} from "@/shared/assets/images";

export const RegistrationInfoPage = () => {
    const { navigate } = useProjectNavigate()

    const {
        phone,
        password,
        nickname,
        registrationState,
    } = useSelector((state: RootState) => state.registration)
    const dispatch = useDispatch<AppDispatch>()

    const [name, setName] = useState('')
    const [isError, setIsError] = useState(false)

    const onClick = useCallback(() => {
        if (nickname.length) {
            dispatch(registrationModel.thunks.registrationThunk({
                phone,
                password,
                username: nickname,
            }))
        } else {
            setIsError(true)
        }
    }, [nickname])

    useEffect(() => {
        if (registrationState === 'success') {
            navigate(
                RootPaths.AUTH,
                AuthPaths.LOGIN
            )
        }
    }, [registrationState])

    return (
        <AuthLayout
            title={'Данные для связи'}
            description={'Будут отображаться в вашем профиле'}
            offsetTop={'s'}
        >
            <img
                className={styles.icon}
                src={images.user}
                alt={'user'}
            />
            <Input
                className={styles.field}
                value={nickname}
                placeholder={'Никнейм'}
                isError={isError}
                setValue={v => {
                    setIsError(false)
                    dispatch(registrationModel.actions.updateNickname(v))
                }}
            />
            <Input
                className={styles.field}
                value={name}
                placeholder={'Как вас зовут?'}
                setValue={setName}
            />
            <Button
                className={styles.button}
                isLoading={registrationState === 'pending'}
                onClick={onClick}
            >
                Далее
            </Button>
        </AuthLayout>
    )
}