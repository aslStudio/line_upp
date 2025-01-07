import { Image } from './Image'
import { Info } from './Info'
import { IsEventClosed } from './IsEventClosed'
import { PersonalNotification } from './PersonalNotification'
import { EventColor } from './EventColor'
import { DateAndTime } from './DateAndTime'
import { Price } from './Price'
import { Organizers } from './Organizers'
import { Project } from './Project'
import { Subgroup } from './Subgroup'
import { Participants } from './Participants'
import { InviteLink } from "./InviteLink"
import { Buttons } from "./Buttons"
import styles from './EventCreateForm.module.scss'

export const EventCreateForm = () => {
    return (
        <div className={styles.root}>
            <Image />
            <Info />
            <IsEventClosed />
            <PersonalNotification />
            <EventColor />
            <DateAndTime />
            <Price />
            <Organizers />
            <Project />
            <Subgroup />
            <Participants />
            <InviteLink />
            <Buttons />
        </div>
    )
}