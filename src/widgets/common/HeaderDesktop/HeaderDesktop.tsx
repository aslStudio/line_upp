import { useCallback, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

import { CalendarPaths, RootPaths } from "@/shared/lib";
import { Icon, IconProps } from "@/shared/ui/Icon";
import { TransitionFade } from "@/shared/ui/TransitionFade";

import styles from "./headerDesktop.module.scss";
import { useScreen } from "@/shared/lib/providers/ScreenProvider";
import { images } from "@/shared/assets/images";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { viewerModel } from "@/entities/viewer/model";
import { ProfileDropdownContainer } from "./ProfileDropdown";

const data: {
    id: RootPaths;
    name: string;
    icon: IconProps["name"];
    path: string;
}[] = [
    {
        id: RootPaths.CALENDAR,
        name: "Календарь",
        icon: "calendar",
        path: `${RootPaths.CALENDAR}/${CalendarPaths.WEEK}`,
    },
    {
        id: RootPaths.SCHEDULE_CALENDAR,
        name: "Расписание",
        icon: "star",
        path: `${RootPaths.SCHEDULE_CALENDAR}/${CalendarPaths.WEEK}`,
    },
    {
        id: RootPaths.PROJECT_CALENDAR,
        name: "Проекты",
        icon: "people",
        path: `${RootPaths.PROJECT_CALENDAR}/${CalendarPaths.WEEK}`,
    },
];

export const HeaderDesktop = () => {
    const location = useLocation();
    const { isMobile } = useScreen();
    const dispatch = useDispatch<AppDispatch>();
    const { data: dataUser } = useSelector((state: RootState) => state.viewer);
    const isShow = useMemo(() => {
        return (
            !isMobile &&
            !location.pathname.includes(RootPaths.AUTH) &&
            !location.pathname.includes(RootPaths.EVENTS) &&
            !location.pathname.includes(RootPaths.SCHEDULE) &&
            !location.pathname.includes(RootPaths.PROJECTS)
        );
    }, [location, isMobile]);
    useEffect(() => {
        if (!dataUser.name && !isMobile) {
            dispatch(viewerModel.thunks.getViewerThunk());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getView = useCallback(
        (id: RootPaths) => {
            return location.pathname.includes(id) ? "brand" : "placeholder";
        },
        [location]
    );
    if (!isShow) return null;

    return createPortal(
        <TransitionFade className={styles.root}>
            {isShow && (
                <div className={styles.wrapper}>
                    <div className={styles.mainContent}>
                        <div className={styles.logo}>
                            <img
                                className={styles.icon}
                                src={images.logo}
                                alt={"LINEUPP"}
                            />
                        </div>
                        <div className={styles.listNav}>
                            {data.map((item) => (
                                <Link
                                    key={item.id}
                                    className={styles.item}
                                    to={item.path}
                                >
                                    <Icon
                                        name={item.icon}
                                        size={30}
                                        view={getView(item.id)}
                                    />
                                    <p
                                        className={
                                            item.path === location.pathname
                                                ? styles.selected
                                                : ""
                                        }
                                    >
                                        {item.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <div className={styles.profile}>
                            <ProfileDropdownContainer />
                        </div>
                    </div>
                    <div className={styles.notices}>
                        <Icon
                            name={"notifications"}
                            size={25}
                            view={getView(RootPaths.NOTIFICATION)}
                        />
                    </div>
                </div>
            )}
        </TransitionFade>,
        document.body
    );
};
