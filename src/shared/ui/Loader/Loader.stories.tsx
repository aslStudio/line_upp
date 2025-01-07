import { Loader } from './Loader'
import { colors, sizes } from './model'

const meta = {
    title: 'Shared/Loader',
    component: Loader,
    argTypes: {
        size: {
            options: sizes,
            control: {
                type: 'select',
            },
        },
        color: {
            options: colors,
            control: {
                type: 'select',
            },
        },

    },
}

export default meta

export const Default = {
    args: {
        size: 'm',
        color: 'white',
    },
}
