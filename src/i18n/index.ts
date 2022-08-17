import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import * as Updates from 'expo-updates'
import { I18n } from 'i18n-js'
import { TranslateOptions } from 'i18n-js/typings/typing'
import { useEffect, useState } from 'react'
import { en } from './translations/en'
import { pt } from './translations/pt'
import { Translation } from './types'

export const i18n = new I18n(
  { en, pt },
  {
    locale: Localization.locale,
    defaultLocale: 'en',
    enableFallback: true,
  }
)

export const t = (
  key: keyof Translation,
  options?: TranslateOptions | undefined
) => i18n.t(key, options)

const STORAGE_TOKEN = 'locale'

export const useSavedLocale = () => {
  const [localeLoaded, setLocaleLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_TOKEN)
      .then(locale => {
        if (locale) i18n.locale = locale
      })
      .finally(() => {
        setLocaleLoaded(true)
      })
  }, [])

  return [localeLoaded]
}

export const changeLocale = async (locale: string | null) => {
  if (!locale) await AsyncStorage.removeItem(STORAGE_TOKEN)
  else await AsyncStorage.setItem(STORAGE_TOKEN, locale)
  await Updates.reloadAsync()
}
