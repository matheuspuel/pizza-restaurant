import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import * as Updates from 'expo-updates'
import I18n from 'i18n-js'
import { useEffect, useState } from 'react'
import { en } from './translations/en'
import { pt } from './translations/pt'
import { Translation } from './types'

I18n.translations = {
  en,
  pt,
}
I18n.locale = Localization.locale
I18n.fallbacks = true
I18n.defaultLocale = 'en'

export const t = (key: keyof Translation) => I18n.t(key)

const STORAGE_TOKEN = 'locale'

export const useSavedLocale = () => {
  const [localeLoaded, setLocaleLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_TOKEN)
      .then(locale => {
        if (locale) I18n.locale = locale
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
