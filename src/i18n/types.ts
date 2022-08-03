import { en } from './translations/en'

export type Translation = {
  [k in keyof typeof en]: (string & {}) | typeof en[k]
}
