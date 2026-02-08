import { createI18n } from 'vue-i18n'
import ko from '@/locales/ko.json'
import en from '@/locales/en.json'
import { storage } from '@/utils/storage'

export type LocaleType = 'ko' | 'en'

const LOCALE_KEY = 'app_language'

const i18n = createI18n({
  legacy: false,
  locale: storage.get<LocaleType>(LOCALE_KEY) ?? 'ko',
  fallbackLocale: 'ko',
  messages: {
    ko,
    en,
  },
  missingWarn: false,
  fallbackWarn: false,
})

export function setLocale(locale: LocaleType): void {
  i18n.global.locale.value = locale
  storage.set(LOCALE_KEY, locale)
  document.documentElement.setAttribute('lang', locale)
}

export function getLocale(): LocaleType {
  return i18n.global.locale.value as LocaleType
}

export default i18n
