import React, {useCallback, useState} from "react"
import {clsx} from "clsx"
import {useDispatch} from "react-redux"

import {registrationModel} from "@/features/auth"

import {AuthLayout} from "@/shared/layouts"
import {Input} from "@/shared/ui/fields/Input"
import {Icon, IconProps} from "@/shared/ui/Icon"
import {Button} from "@/shared/ui/Button"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {AuthPaths, RegistrationPaths, RootPaths} from "@/shared/lib"

import styles from './Password.module.scss'

export const RegistrationPasswordPage = () => {
    const { navigate } = useProjectNavigate()

    const dispatch = useDispatch()

    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const onClick = useCallback(() => {
        const isValid = ruleTypes.reduce(
            (prev, curr) => {
                return prev && rulesMap[curr](password, repeatPassword)
            },
            true
        )

        if (isValid) {
            dispatch(registrationModel.actions.updatePassword(password))
            navigate(
                RootPaths.AUTH,
                AuthPaths.REGISTRATION,
                RegistrationPaths.INFO
            )
        }
    }, [password, repeatPassword])

    return (
        <AuthLayout
            title={'Пароль'}
            description={'Будет использоваться для входа'}
        >
            <Input
                className={styles.field}
                value={password}
                type={'password'}
                placeholder={'Пароль'}
                setValue={setPassword}
            />
            <Input
                className={styles.field}
                value={repeatPassword}
                type={'password'}
                placeholder={'Повторите пароль'}
                setValue={setRepeatPassword}
            />
            <Rules
                password={password}
                repeatPassword={repeatPassword}
            />
            <Button
                className={styles.button}
                onClick={onClick}
            >
                Далее
            </Button>
        </AuthLayout>
    )
}

const ruleTypes = [
    'length',
    'special-chars',
    'number',
    'upper-letter',
    'similar',
    'no-spaces'
] as const
type RuleTypes = typeof ruleTypes[number]

const SPECIAL_CHARS = '!@#$%^&*()_+=-{}[]|\\:;\'<>?,./';

const rulesMap: Record<
    RuleTypes,
    (pass: string, repeat: string) => boolean
> = {
    length: pass => pass.length > 8,
    'special-chars': pass =>
        SPECIAL_CHARS.split('').some(
            char => pass.includes(char)
        ),
    number: pass => /[0-9]/.test(pass),
    'upper-letter': pass => /[A-Z]/.test(pass),
    similar: (pass, repeat) => pass === repeat,
    'no-spaces': pass => !pass.includes(' '),
}

const rulesTextMap: Record<RuleTypes, string> = {
    length: 'Минимальная длина пароля должна быть 8 символов.',
    'special-chars': 'Пароль должен содержать специальные символы.',
    number: 'Пароль должен содержать хотя бы одну цифру.',
    'upper-letter': 'Пароль должен содержать хотя бы одну заглавную букву.',
    similar: 'Пароли должны совпадать.',
    'no-spaces': 'Пароль не должен содержать пробелов'
}

const Rules: React.FC<{
    password: string,
    repeatPassword: string
}> = ({
    password,
    repeatPassword,
}) => {
    function getIconProps(
        pass: string,
        repeat: string,
        cb: (pass: string, repeat: string) => boolean
    ): IconProps {
        if (cb(pass, repeat)) {
            return {
                name: 'check',
                view: 'success',
                size: 20,
            }
        }

        return {
            name: 'cross',
            view: 'critical',
            size: 20,
        }
    }

    return (
        <div className={styles.rules}>
            {ruleTypes.map(item => (
                <div
                    className={clsx(
                        styles['rule-item'],
                        {
                            [styles['is-active']]: rulesMap[item](password, repeatPassword)
                        }
                    )}
                >
                    <Icon
                        {...getIconProps(
                            password,
                            repeatPassword,
                            rulesMap[item],
                        )}
                    />
                    <p>
                        {rulesTextMap[item]}
                    </p>
                </div>
            ))}
        </div>
    )
}