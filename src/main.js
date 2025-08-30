import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './style.css'

// Import translations
import en from './locales/en.json'
import ru from './locales/ru.json'

// Determine initial locale from URL, localStorage, or default
const path = window.location.pathname
let initialLocale = 'en'

// Priority: URL > localStorage > default
if (path.startsWith('/ru')) {
  initialLocale = 'ru'
} else if (path.startsWith('/en')) {
  initialLocale = 'en'
} else {
  // No language in URL, check localStorage
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['en', 'ru'].includes(savedLocale)) {
    initialLocale = savedLocale
    // Update URL to match the saved locale
    if (savedLocale === 'ru') {
      window.history.replaceState(null, '', '/ru')
    } else {
      window.history.replaceState(null, '', '/')
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    ru
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')

// Handle routing for non-asset URLs
function handleRouting() {
  const path = window.location.pathname
  
  // Check if it's an asset (has file extension)
  const isAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|xml|txt)$/i.test(path)
  
  if (!isAsset && !path.match(/^\/(en|ru)?$/)) {
    // Redirect non-asset, non-language paths to home
    window.history.replaceState(null, '', '/')
  }
}

// Handle initial load
handleRouting()

// Handle browser back/forward
window.addEventListener('popstate', handleRouting)
