import {fn} from "@storybook/test"

import { InputBase } from './InputBase.tsx'

const meta = {
    title: 'Shared/fields/InputBase',
    component: InputBase,
    argTypes: {
        onClick: 'function',
    }
}

export default meta

export const Default = {
    args: {
        onClick: fn(),
    }
}