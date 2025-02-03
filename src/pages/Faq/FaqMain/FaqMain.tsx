import { Icon } from "@/shared/ui/Icon";
import { useProjectNavigate } from "@/shared/lib/hooks";
import { FAQPaths, RootPaths } from "@/shared/lib";

import styles from "./FaqMain.module.scss";
import { useScreen } from "@/shared/lib/providers/ScreenProvider";
import { FaqList } from "@/features/faq/FaqList";
import { useState } from "react";
import clsx from "clsx";

export const FaqMain = () => {
    const { navigate } = useProjectNavigate();
    const { isMobile } = useScreen();
    const [activeSection, setActiveSection] = useState<string>("faq");
    const handleSectionClick = (
        sectionId: string,
        path: { root: string; child: string }
    ) => {
        if (!isMobile) {
            setActiveSection(sectionId);
        }
        if (isMobile && path) {
            navigate(path.root, path.child);
        }
    };
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div>
                    <h2 className={styles.title}>Помощь</h2>
                    <div
                        className={clsx(styles.cell, {
                            [styles.active]: activeSection == "faq",
                        })}
                        onClick={() => {
                            handleSectionClick("faq", {
                                root: RootPaths.FAQ,
                                child: FAQPaths.LIST,
                            });
                        }}
                    >
                        <p>FAQ</p>
                        <Icon
                            name={"chevron"}
                            className={styles.color}
                            view={"placeholder"}
                            size={24}
                        />
                    </div>
                    <div className={styles.cell}>
                        <p>Обучение</p>
                        <Icon name={"chevron"} view={"placeholder"} size={24} />
                    </div>
                    <div className={styles.cell}>
                        <p>Пользовательское соглашение</p>
                        <Icon name={"chevron"} view={"placeholder"} size={24} />
                    </div>
                </div>
                <div>
                    <h2 className={styles.title}>Поддержка</h2>
                    <div className={styles.cell}>
                        <p>Открыть чат с поддержкой</p>
                        <Icon name={"chevron"} view={"placeholder"} size={24} />
                    </div>
                </div>
            </div>
            {!isMobile && <FaqList className={styles.section} />}
        </div>
    );
};
