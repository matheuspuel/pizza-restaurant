import * as Localization from 'expo-localization'
import I18n from 'i18n-js'
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
