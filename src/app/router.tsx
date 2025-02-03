import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AuthPage } from "@/pages/Auth/Auth";
import { Login } from "@/pages/Auth/Login";
import {
    Registration,
    RegistrationCodePage,
    RegistrationInfoPage,
    RegistrationPasswordPage,
    RegistrationPhonePage,
} from "@/pages/Auth/Registration";
import {
    OnBoarding,
    OnBoardingCalendarPage,
    OnBoardingParticipantsPage,
    OnBoardingProjectsPage,
    OnBoardingSavePage,
} from "@/pages/Auth/OnBoarding";
import {
    CalendarPage,
    CalendarMonthPage,
    CalendarWeekPage,
} from "@/pages/Calendar";
import {
    EventPage,
    EventShowPage,
    EventCreate,
    EventCreateType,
    EventCreateForm,
    EventCreateAddress,
    EventCreateCalendar,
    EventCreateOrganizers,
    EventCreateRepeat,
    EventCreateProject,
    EventCreateSubgroup,
    EventCreateParticipants,
} from "@/pages/Event";
import {
    ScheduleMonthPage,
    ScheduleCalendarPage,
    ScheduleWeekPage,
} from "@/pages/ScheduleCalendarPage";
import {
    ProjectCalendarPage,
    ProjectMonthPage,
    ProjectWeekPage,
} from "@/pages/ProjectCalendarPage";
import {
    ScheduleListPage,
    SchedulePage,
    ScheduleShowPage,
} from "@/pages/SchedulePage";
import {
    ProjectListPage,
    ProjectPage,
    ProjectShowPage,
} from "@/pages/ProjectPage";
import {
    ProjectCreateOrganizersPage,
    ProjectCreatePage,
    ProjectCreateParticipantsPage,
} from "@/pages/ProjectPage/ProjectCreatePage";
import { ProjectCreateFormPage } from "@/pages/ProjectPage/ProjectCreatePage/ProjectCreateFormPage";
import {
    NotificationsArchivePage,
    NotificationsListPage,
    NotificationsPage,
    NotificationsSettingsPage,
} from "@/pages/NotificationsPage";
import {
    ProfilePage,
    ViewerProfilePage,
    EditProfilePage,
    ViewerSecurityPage,
    ViewerContacts,
} from "@/pages/ProfilePage";
import {
    ResetPassword,
    ResetPasswordCodePage,
    ResetPasswordPhonePage,
    ResetPasswordRepeatPage,
} from "@/pages/Auth/ResetPassword";
import { BlockedUsersPage, UserPage, UserShowPage } from "@/pages/UserPage";
import { FaqMain, FaqPage } from "@/pages/Faq";

import { NotificationListProvider } from "@/widgets/notification";

import {
    AuthPaths,
    CalendarPaths,
    CreateEventPaths,
    EventsPaths,
    OnBoardingPaths,
    RegistrationPaths,
    RootPaths,
    SchedulePaths,
    ProjectPaths,
    CreateProjectPaths,
    NotificationPaths,
    ProfilePaths,
    RecoveryPaths,
    UserPaths,
    FAQPaths,
} from "@/shared/lib";
import { tokenModel } from "@/shared/model";
import { useRouteTransitionContext } from "@/shared/lib/providers/RouteTransitionProvider";
import { useProjectNavigate, useTelegram } from "@/shared/lib/hooks";
import { FaqList } from "@/features/faq/FaqList";

export const RouterView = () => {
    const location = useLocation();
    const { goBack } = useProjectNavigate();

    const { BackButton } = useTelegram();
    const {
        displayLocation,
        rootClass,
        setAuthClass,
        setMainClass,
        setRootClass,
        setEventsClass,
        setScheduleClass,
        setDisplayLocation,
    } = useRouteTransitionContext();

    useEffect(() => {
        const locationRoot = location.pathname.split("/")[1];
        const locationSub = location.pathname.split("/")[2];
        const displayRoot = displayLocation.pathname.split("/")[1];
        const displaySub = displayLocation.pathname.split("/")[2];

        if (locationRoot !== displayRoot) {
            setRootClass("fade-out");
        } else if (locationSub !== displaySub) {
            if (RootPaths.AUTH.includes(locationRoot)) {
                setAuthClass("fade-out");
            } else if (RootPaths.CALENDAR.includes(locationRoot)) {
                setMainClass("fade-out");
            } else if (RootPaths.EVENTS.includes(locationRoot)) {
                setEventsClass("fade-out");
            } else if (RootPaths.SCHEDULE_CALENDAR.includes(locationRoot)) {
                setScheduleClass("fade-out");
            }
        }
        setTimeout(() => {
            setRootClass("fade-in");
            setAuthClass("fade-in");
            setMainClass("fade-in");
            setScheduleClass("fade-in");
            setEventsClass("fade-in");
            setDisplayLocation(location);
        }, 300);
    }, [location, displayLocation]);

    useEffect(() => {
        const locationSub = location.pathname.split("/")[2];

        if (
            locationSub &&
            [CalendarPaths.WEEK, CalendarPaths.MONTH].includes(
                locationSub as CalendarPaths
            )
        ) {
            BackButton?.hide();
        } else {
            BackButton?.show();
            BackButton?.onClick(goBack);
        }
    }, [location]);

    return (
        <div className={rootClass}>
            <Routes location={displayLocation}>
                <Route path={`${RootPaths.AUTH}/*`} element={<AuthPage />}>
                    <Route path={AuthPaths.LOGIN} element={<Login />} />
                    <Route
                        path={`${AuthPaths.REGISTRATION}/*`}
                        element={
                            <CheckIsLoginRoute>
                                <Registration />
                            </CheckIsLoginRoute>
                        }
                    >
                        <Route
                            path={RegistrationPaths.PHONE}
                            element={<RegistrationPhonePage />}
                        />
                        <Route
                            path={RegistrationPaths.CODE}
                            element={<RegistrationCodePage />}
                        />
                        <Route
                            path={RegistrationPaths.PASSWORD}
                            element={<RegistrationPasswordPage />}
                        />
                        <Route
                            path={RegistrationPaths.INFO}
                            element={<RegistrationInfoPage />}
                        />
                    </Route>
                    <Route
                        path={AuthPaths.RECOVERY}
                        element={<ResetPassword />}
                    >
                        <Route
                            path={RecoveryPaths.PHONE}
                            element={<ResetPasswordPhonePage />}
                        />
                        <Route
                            path={RecoveryPaths.CODE}
                            element={<ResetPasswordCodePage />}
                        />
                        <Route
                            path={RecoveryPaths.PASSWORD}
                            element={<ResetPasswordRepeatPage />}
                        />
                    </Route>
                    <Route
                        path={`${AuthPaths.ON_BOARDING}/*`}
                        element={<OnBoarding />}
                    >
                        <Route
                            path={OnBoardingPaths.CALENDAR}
                            element={<OnBoardingCalendarPage />}
                        />
                        <Route
                            path={OnBoardingPaths.PROJECTS}
                            element={<OnBoardingProjectsPage />}
                        />
                        <Route
                            path={OnBoardingPaths.PARTICIPANTS}
                            element={<OnBoardingParticipantsPage />}
                        />
                        <Route
                            path={OnBoardingPaths.SAVE}
                            element={<OnBoardingSavePage />}
                        />
                    </Route>
                </Route>
                <Route
                    path={`${RootPaths.CALENDAR}/*`}
                    element={
                        <PrivateRoute>
                            <CalendarPage />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path={CalendarPaths.WEEK}
                        element={
                            <PrivateRoute>
                                <CalendarWeekPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={CalendarPaths.MONTH}
                        element={
                            <PrivateRoute>
                                <CalendarMonthPage />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route
                    path={`${RootPaths.SCHEDULE_CALENDAR}/*`}
                    element={
                        <PrivateRoute>
                            <ScheduleCalendarPage />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path={CalendarPaths.WEEK}
                        element={
                            <PrivateRoute>
                                <ScheduleWeekPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={CalendarPaths.MONTH}
                        element={
                            <PrivateRoute>
                                <ScheduleMonthPage />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route
                    path={`${RootPaths.PROJECT_CALENDAR}/*`}
                    element={
                        <PrivateRoute>
                            <ProjectCalendarPage />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path={CalendarPaths.MONTH}
                        element={
                            <PrivateRoute>
                                <ProjectMonthPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={CalendarPaths.WEEK}
                        element={
                            <PrivateRoute>
                                <ProjectWeekPage />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path={`${RootPaths.EVENTS}/*`} element={<EventPage />}>
                    <Route
                        path={EventsPaths.EXPAND}
                        element={<EventShowPage />}
                    />
                    <Route
                        path={`${EventsPaths.CREATE}/*`}
                        element={<EventCreate />}
                    >
                        <Route
                            path={CreateEventPaths.EVENT_TYPE}
                            element={<EventCreateType />}
                        />
                        <Route
                            path={CreateEventPaths.FORM}
                            element={<EventCreateForm />}
                        />
                        <Route
                            path={CreateEventPaths.PLACE}
                            element={<EventCreateAddress />}
                        />
                        <Route
                            path={CreateEventPaths.START_CALENDAR}
                            element={<EventCreateCalendar />}
                        />
                        <Route
                            path={CreateEventPaths.REPEAT}
                            element={<EventCreateRepeat />}
                        />
                        <Route
                            path={CreateEventPaths.ORGANIZER}
                            element={<EventCreateOrganizers />}
                        />
                        <Route
                            path={CreateEventPaths.PROJECT}
                            element={<EventCreateProject />}
                        />
                        <Route
                            path={CreateEventPaths.SUBGROUP}
                            element={<EventCreateSubgroup />}
                        />
                        <Route
                            path={CreateEventPaths.PARTICIPANTS}
                            element={<EventCreateParticipants />}
                        />
                    </Route>
                </Route>
                <Route path={RootPaths.SCHEDULE} element={<SchedulePage />}>
                    <Route
                        path={SchedulePaths.LIST}
                        element={<ScheduleListPage />}
                    />
                    <Route
                        path={SchedulePaths.EXPAND}
                        element={<ScheduleShowPage />}
                    />
                </Route>
                <Route path={RootPaths.PROJECTS} element={<ProjectPage />}>
                    <Route
                        path={ProjectPaths.LIST}
                        element={<ProjectListPage />}
                    />
                    <Route
                        path={ProjectPaths.EXPAND}
                        element={<ProjectShowPage />}
                    />
                    <Route
                        path={ProjectPaths.CREATE}
                        element={<ProjectCreatePage />}
                    >
                        <Route
                            path={CreateProjectPaths.FORM}
                            element={<ProjectCreateFormPage />}
                        />
                        <Route
                            path={CreateProjectPaths.PARTICIPANTS}
                            element={<ProjectCreateParticipantsPage />}
                        />
                        <Route
                            path={CreateProjectPaths.ORGANIZER}
                            element={<ProjectCreateOrganizersPage />}
                        />
                    </Route>
                </Route>
                <Route
                    path={RootPaths.NOTIFICATION}
                    element={
                        <NotificationListProvider>
                            <NotificationsPage />
                        </NotificationListProvider>
                    }
                >
                    <Route
                        path={NotificationPaths.LIST}
                        element={<NotificationsListPage />}
                    />
                    <Route
                        path={NotificationPaths.ARCHIVE}
                        element={<NotificationsArchivePage />}
                    />
                    <Route
                        path={NotificationPaths.SETTINGS}
                        element={<NotificationsSettingsPage />}
                    />
                </Route>
                <Route
                    path={RootPaths.PROFILE}
                    element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path={ProfilePaths.VIEWER}
                        element={<ViewerProfilePage />}
                    />
                    <Route
                        path={ProfilePaths.UPDATE}
                        element={<EditProfilePage />}
                    />
                    <Route
                        path={ProfilePaths.SECURITY}
                        element={<ViewerSecurityPage />}
                    />
                    <Route
                        path={ProfilePaths.CONTACTS}
                        element={<ViewerContacts />}
                    />
                </Route>
                <Route
                    path={RootPaths.USER}
                    element={
                        <PrivateRoute>
                            <UserPage />
                        </PrivateRoute>
                    }
                >
                    <Route path={UserPaths.SHOW} element={<UserShowPage />} />
                    <Route
                        path={UserPaths.BLOCKED}
                        element={<BlockedUsersPage />}
                    />
                </Route>
                <Route path={RootPaths.FAQ} element={<FaqPage />}>
                    <Route path={FAQPaths.MAIN} element={<FaqMain />} />
                    <Route path={FAQPaths.LIST} element={<FaqList />} />
                </Route>
                <Route path={RootPaths.ANOTHER} element={<AnotherRoute />} />
            </Routes>
        </div>
    );
};

const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const token = tokenModel.getAccessToken();

    if (!token) {
        return <Navigate to={`${RootPaths.AUTH}/${AuthPaths.LOGIN}`} replace />;
    }

    return <>{children}</>;
};

const CheckIsLoginRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const token = tokenModel.getAccessToken();

    if (token) {
        return (
            <Navigate
                to={`${RootPaths.CALENDAR}/${CalendarPaths.WEEK}`}
                replace
            />
        );
    }

    return <>{children}</>;
};

const AnotherRoute = () => {
    const token = tokenModel.getAccessToken();

    if (token) {
        return (
            <Navigate
                to={`${RootPaths.CALENDAR}/${CalendarPaths.WEEK}`}
                replace
            />
        );
    }

    return <Navigate to={`${RootPaths.AUTH}/${AuthPaths.LOGIN}`} replace />;
};
