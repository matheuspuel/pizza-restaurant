import { LinearGradient } from 'expo-linear-gradient'
import * as SystemUI from 'expo-system-ui'
import {
  NativeBaseProvider,
  StatusBar,
  useColorMode,
  useColorModeValue,
} from 'native-base'
import { useEffect } from 'react'
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
        <AppContent />
      </NativeBaseProvider>
    </Provider>
  )
}

const AppContent = () => {
  const { colorMode } = useColorMode()

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(
      colorMode === 'dark' ? '#000000' : '#ffffff'
    )
  }, [colorMode])

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="#00000000"
        barStyle={useColorModeValue('dark-content', 'light-content')}
      />
      <Loading />
    </>
  )
}
