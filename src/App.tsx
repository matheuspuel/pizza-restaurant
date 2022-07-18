import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'
import { Loading } from './Loading'
import store from './redux/store'
import { lightTheme } from './theme/light'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <ActionSheetProvider>
          <Loading />
        </ActionSheetProvider>
      </ThemeProvider>
    </Provider>
  )
}
