import { LinearGradient } from 'expo-linear-gradient'
import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import { NativeBaseProvider, useColorMode, useTheme } from 'native-base'
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
  const { colors } = useTheme()

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(
      colorMode === 'dark' ? colors.darkBackground : colors.lightBackground
    )
    NavigationBar.setBackgroundColorAsync(
      colorMode === 'dark' ? colors.darkBackground : colors.lightBackground
    )
    NavigationBar.setButtonStyleAsync(colorMode === 'dark' ? 'light' : 'dark')
  }, [colorMode])

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="#00000000"
        style={colorMode === 'dark' ? 'light' : 'dark'}
      />
      <Loading />
    </>
  )
}
