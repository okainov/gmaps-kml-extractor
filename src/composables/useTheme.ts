import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

const THEME_STORAGE_KEY = 'gmaps-kml-theme'

export function useTheme() {
  const theme = ref<Theme>('auto')
  const isDark = ref(false)

  // Check if user prefers dark mode
  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Load theme from localStorage or use system preference
  const loadTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      theme.value = savedTheme
    } else {
      theme.value = 'auto'
    }
    updateTheme()
  }

  // Update the actual theme applied to the document
  const updateTheme = () => {
    const actualTheme = theme.value === 'auto' ? getSystemTheme() : theme.value
    isDark.value = actualTheme === 'dark'
    
    if (actualTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Set theme and save to localStorage
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    updateTheme()
  }

  // Toggle between light, dark, and auto
  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Listen for system theme changes
  const setupSystemThemeListener = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (theme.value === 'auto') {
        updateTheme()
      }
    })
  }

  // Watch for theme changes
  watch(theme, updateTheme)

  onMounted(() => {
    loadTheme()
    setupSystemThemeListener()
  })

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    getSystemTheme
  }
}
