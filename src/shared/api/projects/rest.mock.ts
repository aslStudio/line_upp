import { ProjectsApi } from './types.ts'
import {delay} from "@/shared/lib/time.ts";
import {getRandomInt} from "@/shared/lib/number.ts";
import {InviteLinkType, ProjectAccessType, ReminderType} from "@/shared/api/enum.ts";

export const projectsApi: ProjectsApi = {
    getProjectsList: async () => {
        await delay()

        return {
            error: false,
            payload: getList(),
        }
    },
    getExpandProject: async ({ id }) => {
        await delay()

        return {
            error: false,
            payload: {
                id,
                name: `PROJECT ${id}`,
                comment: getRandomInt(0, 1) ? 'Приходите немного пораньше, лучше всего  за 10 минут до начала мероприятия' : '',
                note: getRandomInt(0, 1) ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' : '',
                organizers: Array(getRandomInt(1, 10)).fill(1).map((_, key) => ({
                    id: getRandomInt(1, 10_000),
                    name: `ORGANIZER ${key}`,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
                    isCreator: !!getRandomInt(0, 1)
                })),
                participants: Array(getRandomInt(1, 10)).fill(1).map((_, key) => ({
                    id: getRandomInt(1, 10_000),
                    name: `PARTICIPANT ${key}`,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
                })),
                reminder: {
                    type: ReminderType.HOUR,
                    value: 1,
                },
                isNeedSubmit: !!getRandomInt(0, 1),
                invited: Array(getRandomInt(1, 10)).fill(1).map((_, key) => ({
                    id: getRandomInt(1, 10_000),
                    name: `PARTICIPANT ${key}`,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyP1XtJ9j4Hi4TYFk-3mEyDh6wSfKRRwQQw&s',
                })),
                access: getRandomInt(0, 1) ? ProjectAccessType.PUBLIC : ProjectAccessType.PERSONAL,
                inviteLink: 'invite_link',
                inviteLinkType: getRandomInt(0, 1) ? InviteLinkType.PUBLIC : InviteLinkType.LIMITED,
                inviteLinkLimit: 10,
            }
        }
    },
    patchProject: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    },
    remove: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    },
    create: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    },
    update: async () => {
        await delay()

        return {
            error: false,
            payload: null,
        }
    }
}

function getList() {
    return Array(getRandomInt(1, 10)).fill(1).map(() => ({
        id: getRandomInt(1, 10_000),
        name: `project ${getRandomInt(1, 10_000)}`,
        subgroups: Array(getRandomInt(0, 5)).fill(1).map(() => ({
            id: getRandomInt(1, 10_000),
            name: `subgroup ${getRandomInt(1, 10_000)}`,
        }))
    }))
}