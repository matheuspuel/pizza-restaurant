import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { Loading } from './Loading'
import store from './redux/store'
import { lightTheme } from './theme/light'

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={lightTheme}>
        <Loading />
      </NativeBaseProvider>
    </Provider>
  )
}
