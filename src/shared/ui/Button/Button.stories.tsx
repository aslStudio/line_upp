import {fn} from "@storybook/test"

import { Button } from './Button'
import {
    tags,
    views,
    sizes
} from './model.ts'

const meta = {
    title: 'Shared/Button',
    component: Button,
    argTypes: {
        tag: {
            options: tags,
            control: {
                type: 'select',
            },
        },
        href: 'text',
        to: 'text',
        view: {
            options: views,
            control: {
                type: 'select',
            },
        },
        size: {
            options: sizes,
            control: {
                type: 'select',
            },
        },
        isLoading: 'boolean',
        isDisabled: 'boolean',
        isWide: 'boolean',

        onClick: 'function',
    }
}

export default meta

export const Default = {
    args: {
        size: sizes[0],
        view: views[0],
        tag: tags[0],
        isLoading: true,
        children: 'TEXT',
        onClick: fn(),
    }
}