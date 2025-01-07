import type { Preview } from "@storybook/react"

import {ThemeProvider} from "../src/shared/lib/providers"
import "../src/shared/styles/index.scss"

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: story => (
        <ThemeProvider>
            {story()}
        </ThemeProvider>
    )
};

export default preview;
