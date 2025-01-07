import {TextSkeleton} from "@/shared/ui/TextSkeleton";

import styles from './ScheduleName.module.scss'

export const ScheduleNameSkeleton = () => (
    <div className={styles.root}>
        <TextSkeleton
            fontSize={20}
            lineHeight={25}
            view={'secondary'}
            widthRange={[0.5, 0.8]}
        />
    </div>
)