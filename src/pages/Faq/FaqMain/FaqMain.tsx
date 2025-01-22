import {Icon} from "@/shared/ui/Icon"
import {useProjectNavigate} from "@/shared/lib/hooks"
import {FAQPaths, RootPaths} from "@/shared/lib"

import styles from './FaqMain.module.scss'

export const FaqMain = () => {
    const { navigate } = useProjectNavigate()

    return (
        <div className={styles.root}>
            <div>
                <h2 className={styles.title}>Помощь</h2>
                <div
                    className={styles.cell}
                    onClick={() => {
                        navigate(
                            RootPaths.FAQ,
                            FAQPaths.LIST
                        )
                    }}
                >
                    <p>FAQ</p>
                    <Icon
                        name={'chevron'}
                        view={'placeholder'}
                        size={24}
                    />
                </div>
                <div className={styles.cell}>
                    <p>Обучение</p>
                    <Icon
                        name={'chevron'}
                        view={'placeholder'}
                        size={24}
                    />
                </div>
                <div className={styles.cell}>
                    <p>Пользовательское соглашение</p>
                    <Icon
                        name={'chevron'}
                        view={'placeholder'}
                        size={24}
                    />
                </div>
            </div>
            <div>
                <h2 className={styles.title}>Поддержка</h2>
                <div className={styles.cell}>
                    <p>Открыть чат с поддержкой</p>
                    <Icon
                        name={'chevron'}
                        view={'placeholder'}
                        size={24}
                    />
                </div>
            </div>
        </div>
    )
}