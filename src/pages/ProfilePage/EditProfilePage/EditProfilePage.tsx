import {Button} from "@/shared/ui/Button"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {AuthPaths, RecoveryPaths, RootPaths} from "@/shared/lib"

import { AvatarField } from './AvatarField'
import { PhoneField } from './PhoneField'
import { NicknameFieldInput } from './NicknameField'
import { EmailField } from './EmailField'
import { AboutField } from './AboutField'
import styles from './EditProfilePage.module.scss'

export const EditProfilePage = () => {
    const {
        navigate
    } = useProjectNavigate()

    return (
        <div className={styles.root}>
            <AvatarField />
            <PhoneField />
            <NicknameFieldInput />
            <EmailField />
            <AboutField />
            <Button
                view={'secondary'}
                size={'m'}
                onClick={() => {
                    navigate(
                        RootPaths.AUTH,
                        AuthPaths.RECOVERY,
                        RecoveryPaths.PHONE,
                    )
                }}
            >
                Изменить пароль
            </Button>
        </div>
    )
}