<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ $t('app.title') }}</h1>
            <p class="text-gray-600 mt-1">{{ $t('app.description') }}</p>
          </div>
          
          <!-- Language Switcher -->
          <div class="flex items-center space-x-2">
            <button
              @click="switchLanguage"
              class="btn-secondary text-sm"
              :title="$t('language.switch')"
            >
              <span class="hidden sm:inline">{{ currentLanguage === 'en' ? $t('language.russian') : $t('language.english') }}</span>
              <span class="sm:hidden">{{ currentLanguage === 'en' ? 'RU' : 'EN' }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- URL Input Form -->
      <div class="card p-6 mb-8">
        <form @submit.prevent="extractMid" class="space-y-4">
          <div>
            <label for="url-input" class="block text-sm font-medium text-gray-700 mb-2">
              Google MyMaps URL
            </label>
            <input
              id="url-input"
              v-model="inputUrl"
              type="url"
              :placeholder="$t('form.urlPlaceholder')"
              class="input-field"
              :class="{
                'border-green-500 focus:ring-green-500': isValidUrl && inputUrl,
                'border-red-500 focus:ring-red-500': !isValidUrl && inputUrl && hasAttempted
              }"
            />
          </div>
          
          <!-- Validation Messages -->
          <div v-if="inputUrl" class="text-sm">
            <div v-if="isValidUrl" class="text-green-600 flex items-center">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              {{ $t('form.validUrl') }}
            </div>
            <div v-else-if="hasAttempted" class="text-red-600">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                {{ $t('form.invalidUrl') }}
              </div>
              <p class="mt-1 text-xs text-gray-500">{{ $t('form.invalidUrlHelp') }}</p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="!isValidUrl || isLoading"
            class="btn-primary w-full sm:w-auto"
            :class="{ 'opacity-50 cursor-not-allowed': !isValidUrl || isLoading }"
          >
            <span v-if="isLoading" class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
            <span v-else>{{ $t('form.extract') }}</span>
          </button>
        </form>
      </div>

      <!-- Download Links -->
      <div v-if="extractedMid" class="card p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('download.title') }}</h2>
        
        <div class="grid gap-4 sm:grid-cols-2">
          <!-- KMZ Download -->
          <a
            :href="kmzUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="block p-4 border-2 border-primary-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all group"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-primary-700 group-hover:text-primary-800">{{ $t('download.kmz') }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ $t('download.kmzDesc') }}</p>
              </div>
              <svg class="w-5 h-5 text-primary-600 group-hover:text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </a>

          <!-- KML Download -->
          <a
            :href="kmlUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="block p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all group"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-gray-700 group-hover:text-gray-800">{{ $t('download.kml') }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ $t('download.kmlDesc') }}</p>
              </div>
              <svg class="w-5 h-5 text-gray-600 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </a>
        </div>

        <button
          @click="resetForm"
          class="btn-secondary mt-4"
        >
          {{ $t('download.newExtraction') }}
        </button>
      </div>

      <!-- Examples -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('examples.title') }}</h2>
        
        <div class="space-y-3 text-sm">
          <div>
            <span class="font-medium text-gray-700">{{ $t('examples.edit') }}:</span>
            <code class="block mt-1 p-2 bg-gray-100 rounded text-xs break-all">
              https://www.google.com/maps/d/u/0/edit?hl=en&mid=1tWCqTerra6PbOHyn-wncH13ESR2stjw&ll=26.361432629836692%2C52.2930317&z=7
            </code>
          </div>
          
          <div>
            <span class="font-medium text-gray-700">{{ $t('examples.viewer') }}:</span>
            <code class="block mt-1 p-2 bg-gray-100 rounded text-xs break-all">
              https://www.google.com/maps/d/u/0/viewer?mid=1-g8EcBCaspkcM3_giYHSVtP2LS1HSr8&femb=1&ll=48.132268571799074%2C11.55401675000002&z=13
            </code>
          </div>
          
          <div>
            <span class="font-medium text-gray-700">{{ $t('examples.embed') }}:</span>
            <code class="block mt-1 p-2 bg-gray-100 rounded text-xs break-all">
              https://www.google.com/maps/d/u/0/embed?mid=1-g8EcBCaspkcM3_giYHSVtP2LS1HSr8&#038;ehbc=2E312F
            </code>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-16 py-8 border-t bg-white">
      <div class="max-w-4xl mx-auto px-4 text-center text-gray-600 text-sm">
        <p>Made with ❤️ using Vue.js and Tailwind CSS</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

// Reactive data
const inputUrl = ref('')
const extractedMid = ref('')
const isLoading = ref(false)
const hasAttempted = ref(false)

// Computed properties
const currentLanguage = computed(() => locale.value)

const isValidUrl = computed(() => {
  if (!inputUrl.value) return false
  
  try {
    const url = new URL(inputUrl.value)
    
    // Check if it's a Google Maps URL
    if (!url.hostname.includes('google.com')) return false
    if (!url.pathname.includes('/maps/d/')) return false
    
    // Extract mid parameter
    const mid = extractMidFromUrl(inputUrl.value)
    return !!mid
  } catch {
    return false
  }
})

const kmzUrl = computed(() => {
  if (!extractedMid.value) return ''
  return `https://www.google.com/maps/d/u/0/kml?mid=${extractedMid.value}`
})

const kmlUrl = computed(() => {
  if (!extractedMid.value) return ''
  return `https://www.google.com/maps/d/u/0/kml?mid=${extractedMid.value}&forcekml=1`
})

// Methods
function extractMidFromUrl(url) {
  try {
    const urlObj = new URL(url)
    
    // Try to get mid from search parameters
    const midParam = urlObj.searchParams.get('mid')
    if (midParam) return midParam
    
    // Try to extract from URL patterns
    const patterns = [
      /\/maps\/d\/u\/\d+\/edit.*[?&]mid=([^&]+)/,
      /\/maps\/d\/u\/\d+\/viewer.*[?&]mid=([^&]+)/,
      /\/maps\/d\/u\/\d+\/embed.*[?&]mid=([^&]+)/,
      /\/maps\/d\/([^/?&]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
    
    return null
  } catch {
    return null
  }
}

function extractMid() {
  hasAttempted.value = true
  
  if (!isValidUrl.value) return
  
  isLoading.value = true
  
  // Simulate processing delay for better UX
  setTimeout(() => {
    extractedMid.value = extractMidFromUrl(inputUrl.value)
    isLoading.value = false
  }, 500)
}

function resetForm() {
  inputUrl.value = ''
  extractedMid.value = ''
  hasAttempted.value = false
}

function switchLanguage() {
  locale.value = locale.value === 'en' ? 'ru' : 'en'
}
</script>
