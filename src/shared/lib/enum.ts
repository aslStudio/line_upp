export enum RootPaths {
    AUTH = '/auth',
    CALENDAR = '/calendar',
    SCHEDULE_CALENDAR = '/schedule-calendar',
    SCHEDULE = '/schedules',
    EVENTS = '/events',
    ANOTHER = '*',
}

export enum AuthPaths {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    ON_BOARDING = 'on-boarding',
    RECOVERY = 'recovery',
}

export enum RegistrationPaths {
    PHONE = 'phone',
    CODE = 'code',
    PASSWORD = 'password',
    INFO = 'info',
}

export enum OnBoardingPaths {
    CALENDAR = 'calendar',
    PROJECTS = 'projects',
    PARTICIPANTS = 'participants',
    SAVE = 'save',
}

export enum CalendarPaths {
    WEEK = 'week',
    MONTH = 'month'
}

export enum EventsPaths {
    EXPAND = `:id`,
    CREATE = 'create',
}

export enum CreateEventPaths {
    EVENT_TYPE = 'event-type',
    FORM = 'form',
    REPEAT = 'repeat',
    PLACE = 'place',
    ORGANIZER = 'organizer',
    PARTICIPANTS = 'participants',
    START_CALENDAR = 'start-calendar',
    PROJECT = 'project',
    SUBGROUP = 'subgroup',
}

export enum SchedulePaths {
    LIST = 'list',
    EXPAND = ':id'
}