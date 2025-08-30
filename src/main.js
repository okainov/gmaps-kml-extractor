import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './style.css'

// Import translations
import en from './locales/en.json'
import ru from './locales/ru.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ru
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
