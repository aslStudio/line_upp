import { Access } from './Access'
import { Buttons } from './Buttons'
import { Info } from './Info'
import { InviteLink } from './InviteLink'
import { Organizers } from './Organizers'
import { Participants } from './Participants'
import styles from './ProjectCreateFormPage.module.scss'

export const ProjectCreateFormPage = () => {
    return (
        <div className={styles.root}>
            <Info />
            <Organizers />
            <Participants />
            <Access />
            <InviteLink />
            <Buttons />
        </div>
    )
}