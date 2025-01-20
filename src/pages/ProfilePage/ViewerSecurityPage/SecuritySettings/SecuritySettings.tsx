import { useMemo} from "react"
import { useSelector} from "react-redux"

import {RootState} from "@/app/store.tsx"

import {usePatchViewer} from "@/features/viewer/hooks"

import {Radio} from "@/shared/ui/Radio"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Loader} from "@/shared/ui/Loader"
import {Cell} from "@/shared/ui/Cell"
import {TransitionExpand} from "@/shared/ui/TransitionExpand"
import {Toggle} from "@/shared/ui/Toggle"

import styles from './SecuritySettings.module.scss'

export const SecuritySettings = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const { isUpdating, updateField } = usePatchViewer()

    const isOpenProfile = useMemo(() => {
        return (
            data.isShowName &&
            data.isShowAbout &&
            data.isShowEmail &&
            data.isShowPhone &&
            data.isShowTelegram
        )
    }, [
        data.isShowName,
        data.isShowAbout,
        data.isShowEmail,
        data.isShowPhone,
        data.isShowTelegram,
    ])

    async function onOpenProfile() {
        await updateField({
            isShowName: true,
            isShowAbout: true,
            isShowEmail: true,
            isShowPhone: true,
            isShowTelegram: true,
        })
    }

    const isPartialProfile = useMemo(() => {
        return !isOpenProfile && (
            data.isShowName ||
            data.isShowAbout ||
            data.isShowEmail ||
            data.isShowPhone ||
            data.isShowTelegram
        )
    }, [
        isOpenProfile,
        data.isShowName,
        data.isShowAbout,
        data.isShowEmail,
        data.isShowPhone,
        data.isShowTelegram,
    ])

    async function onPartialProfile() {
        await updateField({
            isShowName: true,
            isShowAbout: true,
            isShowEmail: true,
            isShowPhone: false,
            isShowTelegram: true,
        })
    }

    const isClosedProfile = useMemo(() => {
        return (
            !data.isShowName &&
            !data.isShowAbout &&
            !data.isShowEmail &&
            !data.isShowPhone &&
            !data.isShowTelegram
        )
    }, [
        data.isShowName,
        data.isShowAbout,
        data.isShowEmail,
        data.isShowPhone,
        data.isShowTelegram,
    ])

    async function onClosedProfile() {
        await updateField({
            isShowName: false,
            isShowAbout: false,
            isShowEmail: false,
            isShowPhone: false,
            isShowTelegram: false,
        })
    }

    return (
        <div className={styles.root}>
            <h2 className={styles.title}>Безопасность</h2>
            <TransitionFade className={styles.container}>
                {isUpdating && (
                    <Loader
                        key={'Loader'}
                        color={'brand'}
                        size={'m'}
                    />
                )}
                {!isUpdating && (
                    <div className={styles.wrapper}>
                        <Radio
                            value={isOpenProfile}
                            setValue={onOpenProfile}
                        >
                            <Cell
                                title={'Открытый профиль'}
                                description={'Все данные видны'}
                            />
                        </Radio>
                        <Radio
                            value={isPartialProfile}
                            setValue={onPartialProfile}
                        >
                            <Cell
                                title={'Частичная информация'}
                                description={'Только отмеченное вами'}
                            />
                        </Radio>
                        <TransitionExpand
                            isShow={isPartialProfile}
                        >
                            <div>
                                <IsShowNameField />
                                <IsShowAboutField />
                                <IsShowPhoneField />
                                <IsShowTelegramField />
                                <IsShowEmailField />
                            </div>
                        </TransitionExpand>
                        <Radio
                            value={isClosedProfile}
                            setValue={onClosedProfile}
                        >
                            <Cell
                                title={'Закрытый профиль'}
                                description={'Только фото и имя'}
                            />
                        </Radio>
                    </div>
                )}
            </TransitionFade>
        </div>
    )
}

const IsShowNameField = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const { isUpdating, updateField } = usePatchViewer()

    return (
        <div className={styles['toggle-field']}>
            <p>Имя</p>
            <TransitionFade>
                {isUpdating && (
                    <Loader
                        key={'Loader'}
                        color={'brand'}
                        size={'s'}
                    />
                )}
                {!isUpdating && (
                    <Toggle
                        value={data.isShowName}
                        setValue={isShowName => {
                            updateField({ isShowName })
                        }}
                    />
                )}
            </TransitionFade>
        </div>
    )
}

const IsShowAboutField = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const { isUpdating, updateField } = usePatchViewer()

    return (
        <div className={styles['toggle-field']}>
            <p>О себе</p>
            <TransitionFade>
                {isUpdating && (
                    <Loader
                        key={'Loader'}
                        color={'brand'}
                        size={'s'}
                    />
                )}
                {!isUpdating && (
                    <Toggle
                        value={data.isShowAbout}
                        setValue={isShowAbout => {
                            updateField({ isShowAbout })
                        }}
                    />
                )}
            </TransitionFade>
        </div>
    )
}

const IsShowPhoneField = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const { isUpdating, updateField } = usePatchViewer()

    return (
        <div className={styles['toggle-field']}>
            <p>Телефон</p>
            <TransitionFade>
                {isUpdating && (
                    <Loader
                        key={'Loader'}
                        color={'brand'}
                        size={'s'}
                    />
                )}
                {!isUpdating && (
                    <Toggle
                        value={data.isShowPhone}
                        setValue={isShowPhone => {
                            updateField({ isShowPhone })
                        }}
                    />
                )}
            </TransitionFade>
        </div>
    )
}

const IsShowTelegramField = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const { isUpdating, updateField } = usePatchViewer()

    return (
        <div className={styles['toggle-field']}>
            <p>Ссылка на Телеграм</p>
            <TransitionFade>
                {isUpdating && (
                    <Loader
                        key={'Loader'}
                        color={'brand'}
                        size={'s'}
                    />
                )}
                {!isUpdating && (
                    <Toggle
                        value={data.isShowTelegram}
                        setValue={isShowTelegram => {
                            updateField({ isShowTelegram })
                        }}
                    />
                )}
            </TransitionFade>
        </div>
    )
}

const IsShowEmailField = () => {
    const {
        data
    } = useSelector((state: RootState) => state.viewer)
    const { isUpdating, updateField } = usePatchViewer()

    return (
        <div className={styles['toggle-field']}>
            <p>Почта</p>
            <TransitionFade>
                {isUpdating && (
                    <Loader
                        key={'Loader'}
                        color={'brand'}
                        size={'s'}
                    />
                )}
                {!isUpdating && (
                    <Toggle
                        value={data.isShowEmail}
                        setValue={isShowEmail => {
                            updateField({ isShowEmail })
                        }}
                    />
                )}
            </TransitionFade>
        </div>
    )
}