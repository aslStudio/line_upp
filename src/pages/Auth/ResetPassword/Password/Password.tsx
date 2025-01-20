import {useCallback, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store.tsx"

import {resetPasswordModel} from "@/features/auth"

import {useProjectNavigate} from "@/shared/lib/hooks"
import {ProfilePaths, RootPaths} from "@/shared/lib"
import {AuthLayout} from "@/shared/layouts"
import {Input} from "@/shared/ui/fields/Input"
import {Button} from "@/shared/ui/Button"

import styles from './Password.module.scss'

export const ResetPasswordRepeatPage = () => {
    const { navigate } = useProjectNavigate()

    const {
        password,
        repeatPassword,
        resetState
    } = useSelector((state: RootState) => state.resetPassword)
    const dispatch = useDispatch<AppDispatch>()

    const [isError, setIsError] = useState(false)

    const onSubmit = useCallback(() => {
        if (password === repeatPassword) {
            dispatch(resetPasswordModel.thunks.resetPasswordThunk({
                password,
            }))
        } else {
            setIsError(true)
        }
    }, [password, repeatPassword])

    useEffect(() => {
        if (resetState === 'error') {
            setIsError(true)
        }
        if (resetState === 'success') {
            setIsError(false)
            navigate(
                RootPaths.PROFILE,
                ProfilePaths.VIEWER
            )
        }
    }, [resetState])

    return (
        <AuthLayout
            title={'Пароль'}
            description={'Будет использоваться для входа'}
        >
            <Input
                className={styles.field}
                value={password}
                placeholder={'Пароль'}
                type={'password'}
                setValue={v => {
                    dispatch(resetPasswordModel.actions.updatePassword(v))
                }}
            />
            <Input
                className={styles.field}
                value={repeatPassword}
                isError={isError}
                placeholder={'Повторите пароль'}
                type={'password'}
                setValue={v => {
                    setIsError(false)
                    dispatch(resetPasswordModel.actions.updateRepeatPassword(v))
                }}
            />
            <Button
                className={styles.button}
                isLoading={resetState === 'pending'}
                onClick={onSubmit}
            >
                Далее
            </Button>
        </AuthLayout>
    )
}