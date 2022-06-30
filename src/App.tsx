import { StatusBar } from 'expo-status-bar'
import Router from './routes'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider } from 'styled-components/native'
import { lightTheme } from './theme/light'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <StatusBar style="auto" />
        <ActionSheetProvider>
          <Router />
        </ActionSheetProvider>
      </ThemeProvider>
    </Provider>
  )
}
