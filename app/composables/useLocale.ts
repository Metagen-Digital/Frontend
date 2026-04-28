export function useLocale() {
  const { locale, setLocale } = useI18n()

  function toggleLocale() {
    setLocale(locale.value === 'en' ? 'bn' : 'en')
  }

  const localeLabel = computed(() => locale.value === 'en' ? 'EN' : 'বাং')

  return { locale, toggleLocale, localeLabel, setLocale }
}
