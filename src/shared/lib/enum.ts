export enum RootPaths {
    AUTH = '/auth',
    CALENDAR = '/calendar',
    SCHEDULE_CALENDAR = '/schedule-calendar',
    PROJECT_CALENDAR = '/project-calendar',
    SCHEDULE = '/schedules',
    PROJECTS = '/projects',
    EVENTS = '/events',
    NOTIFICATION = '/notification',
    PROFILE = '/profile',
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

export enum RecoveryPaths {
    PHONE = 'phone',
    CODE = 'code',
    PASSWORD = 'password',
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

export enum ProjectPaths {
    LIST = 'list',
    EXPAND = ':id',
    CREATE = 'create',
}

export enum CreateProjectPaths {
    FORM = 'form',
    ORGANIZER = 'organizer',
    PARTICIPANTS = 'participants',
}

export enum NotificationPaths {
    LIST = 'list',
    ARCHIVE = 'archive',
}

export enum ProfilePaths {
    VIEWER = 'viewer',
    UPDATE = 'update',
    SECURITY = 'security',
    CONTACTS = 'contacts',
}