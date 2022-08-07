import { LinearGradient } from 'expo-linear-gradient'
import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { Loading } from './Loading'
import store from './redux/store'
import { theme } from './theme/theme'

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider
        theme={theme}
        config={{ dependencies: { 'linear-gradient': LinearGradient } }}
      >
        <Loading />
      </NativeBaseProvider>
    </Provider>
  )
}
