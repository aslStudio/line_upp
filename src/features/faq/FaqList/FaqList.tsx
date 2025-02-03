import React, { useState } from "react";

import { Icon } from "@/shared/ui/Icon";
import { TransitionExpand } from "@/shared/ui/TransitionExpand";

import styles from "./FaqList.module.scss";
import { clsx } from "clsx";
import { PropsDefault } from "@/shared/lib";

export const FaqList: React.FC<PropsDefault> = ({ className }) => {
    return (
        <div className={clsx(className)}>
            <h1 className={styles.title}>FAQ</h1>
            <Collapse title={"Какой-то крутой вопрос?"}>
                <p>
                    Не менее крутой ответ. Убирайте использованные стаканы,
                    салфетки и другой мусор с зоны обслуживания. Следите за тем,
                    чтобы в зале и в местах для гостей было чисто и уютно.
                </p>
            </Collapse>
            <Collapse title={"Какой-то крутой вопрос?"}>
                <p>
                    Не менее крутой ответ. Убирайте использованные стаканы,
                    салфетки и другой мусор с зоны обслуживания. Следите за тем,
                    чтобы в зале и в местах для гостей было чисто и уютно.
                </p>
            </Collapse>
            <Collapse title={"Какой-то крутой вопрос?"}>
                <p>
                    Не менее крутой ответ. Убирайте использованные стаканы,
                    салфетки и другой мусор с зоны обслуживания. Следите за тем,
                    чтобы в зале и в местах для гостей было чисто и уютно.
                </p>
            </Collapse>
            <Collapse title={"Какой-то крутой вопрос?"}>
                <p>
                    Не менее крутой ответ. Убирайте использованные стаканы,
                    салфетки и другой мусор с зоны обслуживания. Следите за тем,
                    чтобы в зале и в местах для гостей было чисто и уютно.
                </p>
            </Collapse>
            <Collapse title={"Какой-то крутой вопрос?"}>
                <p>
                    Не менее крутой ответ. Убирайте использованные стаканы,
                    салфетки и другой мусор с зоны обслуживания. Следите за тем,
                    чтобы в зале и в местах для гостей было чисто и уютно.
                </p>
            </Collapse>
        </div>
    );
};

const Collapse: React.FC<
    React.PropsWithChildren<{
        title: string;
    }>
> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={clsx(styles.collapse, {
                [styles["is-active"]]: isOpen,
            })}
        >
            <div
                className={styles["collapse-header"]}
                onClick={() => {
                    setIsOpen((prevState) => !prevState);
                }}
            >
                <p>{title}</p>
                <Icon
                    className={styles["collapse-icon"]}
                    name={"chevron"}
                    view={"base"}
                    size={24}
                />
            </div>
            <TransitionExpand isShow={isOpen}>
                <div className={styles["collapse-content"]}>{children}</div>
            </TransitionExpand>
        </div>
    );
};
