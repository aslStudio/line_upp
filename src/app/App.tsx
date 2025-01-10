import {useEffect} from "react"
import {BrowserRouter} from "react-router-dom"

import {CommonHeaderProvider, TabBar} from "@/widgets/common"

import {
	ThemeProvider,
	RouteTransitionProvider
} from "@/shared/lib/providers"
import { useTelegram } from "@/shared/lib/hooks/useTelegram"

import { RouterView } from './router'
import { StoreProvider } from './store'

function App() {
	const { expand, disableVerticalSwipes } = useTelegram()

	useEffect(() => {
		expand()
		disableVerticalSwipes()
	})

	return (
		<StoreProvider>
			<BrowserRouter>
				<ThemeProvider>
					<CommonHeaderProvider>
						<RouteTransitionProvider>
							<RouterView />
							<TabBar />
						</RouteTransitionProvider>
					</CommonHeaderProvider>
				</ThemeProvider>
			</BrowserRouter>
		</StoreProvider>
	)
}

export default App
