type Locale = 'en' | 'bn'

export function useLocale() {
  const locale = useState<Locale>('locale', () => 'en')

  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'bn' : 'en'
  }

  const localeLabel = computed(() => locale.value === 'en' ? 'EN' : 'বাং')

  return { locale, toggleLocale, localeLabel }
}
