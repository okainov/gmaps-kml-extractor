<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 theme-transition">
        <!-- Header -->
        <header
            class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 theme-transition">
            <div class="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white theme-transition">{{ $t('app.title')
                        }}</h1>
                        <p class="text-gray-600 dark:text-gray-300 mt-1 theme-transition">{{ $t('app.description') }}
                        </p>
                    </div>

                    <!-- Controls -->
                    <div class="flex items-center space-x-3">
                        <!-- Theme Switcher -->
                        <ThemeSwitcher />

                        <!-- Language Switcher -->
                        <button @click="switchLanguage" class="btn-secondary text-sm plausible-event-name=SwitchLanguage" :title="$t('language.switch')">
                            <span class="hidden sm:inline">{{ currentLanguage === 'en' ? $t('language.russian') :
                                $t('language.english') }}</span>
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
                        <label for="url-input"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 theme-transition">
                            Google MyMaps URL
                        </label>
                        <input id="url-input" v-model="inputUrl" type="url" :placeholder="$t('form.urlPlaceholder')"
                            class="input-field" :class="{
                                'border-green-500 focus:ring-green-500 dark:border-green-400': urlValidation.type === 'google-maps' && urlValidation.isValid && inputUrl,
                                'border-red-500 focus:ring-red-500 dark:border-red-400': urlValidation.type === 'invalid-url' && inputUrl,
                                'border-blue-500 focus:ring-blue-500 dark:border-blue-400': urlValidation.type === 'valid-url' && inputUrl,
                                'border-orange-500 focus:ring-orange-500 dark:border-orange-400': urlValidation.type === 'google-maps' && !urlValidation.isValid && inputUrl
                            }" />
                    </div>

                    <!-- Validation Messages -->
                    <div v-if="inputUrl" class="text-sm">
                        <!-- Valid Google Maps URL -->
                        <div v-if="urlValidation.type === 'google-maps' && urlValidation.isValid"
                            class="text-green-600 dark:text-green-400 flex items-center theme-transition">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            {{ $t('form.validUrl') }}
                        </div>

                        <!-- Invalid URL Error -->
                        <div v-else-if="urlValidation.type === 'invalid-url'"
                            class="text-red-600 dark:text-red-400 theme-transition">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                {{ $t('form.invalidUrl') }}
                            </div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 theme-transition">{{
                                $t('form.invalidUrlHelp') }}</p>
                        </div>

                        <!-- Invalid Google Maps URL -->
                        <div v-else-if="urlValidation.type === 'google-maps' && !urlValidation.isValid"
                            class="text-orange-600 dark:text-orange-400 theme-transition">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                {{ $t('form.invalidGoogleMaps') }}
                            </div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 theme-transition">{{
                                $t('form.invalidGoogleMapsHelp') }}</p>
                        </div>

                        <!-- Valid URL but not Google Maps -->
                        <div v-else-if="urlValidation.type === 'valid-url'"
                            class="text-blue-600 dark:text-blue-400 theme-transition">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                {{ $t('form.validUrlNotGoogle') }}
                            </div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 theme-transition">{{
                                $t('form.scrapingPageHelp') }}</p>
                        </div>
                    </div>

                    <button type="submit" :disabled="!urlValidation.isValid || isLoading || isScrapingUrl"
                        class="btn-primary w-full sm:w-auto"
                        :class="{ 'opacity-50 cursor-not-allowed': !urlValidation.isValid || isLoading || isScrapingUrl }">
                        <span v-if="isLoading" class="inline-flex items-center">
                            <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Processing...
                        </span>
                        <span v-else>{{ $t('form.extract') }}</span>
                    </button>
                </form>
            </div>

            <!-- Scraped URLs Section -->
            <div v-if="(isScrapingFlow) && urlValidation.type === 'valid-url'"
                class="card p-6 mb-8">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 theme-transition">
                    {{ $t('scraped.title') }}
                </h2>

                <!-- Loading state -->
                <div v-if="isScrapingUrl" class="flex items-center justify-center py-8">
                    <div class="flex items-center space-x-3">
                        <div
                            class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 dark:border-primary-400">
                        </div>
                        <span class="text-gray-600 dark:text-gray-400">{{ $t('scraped.scanning') }}</span>
                    </div>
                </div>

                <!-- Error state -->
                <div v-else-if="scrapingError" class="text-center py-6">
                    <svg class="w-12 h-12 text-red-400 dark:text-red-500 mx-auto mb-3" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-red-600 dark:text-red-400 font-medium mb-2">
                        {{ $t('scraped.error') }}
                    </p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
                        {{ scrapingError }}
                    </p>
                    <button @click="scrapingError = ''; extractMid()" class="mt-4 btn-secondary text-sm plausible-event-name=ErrorTryAgain">
                        {{ $t('scraped.tryAgain') }}
                    </button>
                </div>

                <!-- Scraped URLs found -->
                <div v-else-if="scrapedUrls.length > 0" class="space-y-3">
                    <p class="text-green-600 dark:text-green-400 font-medium">
                        ✅ {{ $t('scraped.found', { count: scrapedUrls.length }) }}
                    </p>
                    <div class="grid gap-3">
                        <button v-for="(scrapedUrl, index) in scrapedUrls" :key="index"
                            @click="useScrapedUrl(scrapedUrl)"
                            class="text-left p-4 border rounded-lg transition-all group plausible-event-name=scrapedClick"
                            :class="scrapedUrl === selectedScrapedUrl 
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' 
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'">
                            <div class="flex items-start justify-between">
                                <div class="flex-1 mr-3">
                                    <span class="text-sm font-mono break-all transition-colors"
                                        :class="scrapedUrl === selectedScrapedUrl 
                                            ? 'text-green-700 dark:text-green-300' 
                                            : 'text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300'">
                                        {{ scrapedUrl }}
                                    </span>
                                </div>
                                <div class="flex items-center space-x-2 flex-shrink-0 mt-0.5">
                                    <!-- Selected checkmark -->
                                    <svg v-if="scrapedUrl === selectedScrapedUrl" 
                                        class="w-4 h-4 text-green-600 dark:text-green-400" 
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <!-- Arrow -->
                                    <svg class="w-4 h-4 transition-colors" 
                                        :class="scrapedUrl === selectedScrapedUrl 
                                            ? 'text-green-600 dark:text-green-400' 
                                            : 'text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- No Google Maps URLs found -->
                <div v-else-if="!isScrapingUrl" class="text-center py-6">
                    <svg class="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                    </svg>
                    <p class="text-orange-600 dark:text-orange-400 font-medium">
                        {{ $t('scraped.notFound') }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {{ $t('scraped.notFoundHelp') }}
                    </p>
                    <p v-if="formattedPageSize" class="text-gray-400 dark:text-gray-500 text-xs mt-2">
                        {{ $t('scraped.pageInfo', { size: formattedPageSize }) }}
                    </p>
                </div>
            </div>


            <!-- Download Links -->
            <div v-if="extractedMid" class="card p-6 mb-8">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 theme-transition">{{
                    $t('download.title') }}</h2>

                <div class="grid gap-4 sm:grid-cols-2">
                    <!-- KML Download (Recommended) -->
                    <a :href="kmlUrl" target="_blank" rel="noopener noreferrer"
                        class="block p-4 border-2 border-primary-200 dark:border-primary-700 rounded-lg hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3
                                    class="font-semibold text-primary-700 dark:text-primary-300 group-hover:text-primary-800 dark:group-hover:text-primary-200 theme-transition">
                                    {{ $t('download.kml') }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 theme-transition">{{
                                    $t('download.kmlDesc') }}</p>
                            </div>
                            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 theme-transition"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                        </div>
                    </a>

                    <!-- KMZ Download -->
                    <a :href="kmzUrl" target="_blank" rel="noopener noreferrer"
                        class="block p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3
                                    class="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 theme-transition">
                                    {{ $t('download.kmz') }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 theme-transition">{{
                                    $t('download.kmzDesc') }}</p>
                            </div>
                            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 theme-transition"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                        </div>
                    </a>
                </div>


                <!-- Google Maps URL Section -->
                <div v-if="currentGoogleMapsUrl" class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        {{ $t('download.googleMapsUrl') }}
                    </h3>
                    <div class="bg-white dark:bg-gray-900 rounded p-3 mb-4 border border-gray-200 dark:border-gray-600">
                        <code class="text-xs text-gray-800 dark:text-gray-200 break-all">
                            {{ currentGoogleMapsUrl }}
                        </code>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <a :href="currentGoogleMapsUrl" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors font-medium">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14">
                                </path>
                            </svg>
                            {{ $t('download.visitMaps') }}
                        </a>
                        <button @click="copyToClipboard(currentGoogleMapsUrl)"
                            class="plausible-event-name=CopyToClipboard inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white rounded-lg text-sm transition-colors font-medium"
                            :class="{ 'bg-green-600 hover:bg-green-700': copySuccess }">
                            <svg v-if="!copySuccess" class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                                </path>
                            </svg>
                            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                            {{ copySuccess ? $t('download.copied') : $t('download.copyUrl') }}
                        </button>
                    </div>
                </div>

                <button @click="resetForm" class="btn-secondary mt-4 plausible-event-name=ResetForm">
                    {{ $t('download.newExtraction') }}
                </button>
            </div>

            <!-- Examples -->
            <div class="card p-6">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 theme-transition">{{
                    $t('examples.title') }}</h2>

                <div class="space-y-3 text-sm">
                    <div>
                        <span class="font-medium text-gray-700 dark:text-gray-300 theme-transition">{{
                            $t('examples.edit') }}:</span>
                        <code
                            class="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs break-all text-gray-800 dark:text-gray-200 theme-transition">
              https://www.google.com/maps/d/u/0/edit?hl=en&mid=1tWCqTerra6PbOHyn-wncH13ESR2stjw&ll=26.361432629836692%2C52.2930317&z=7
            </code>
                    </div>

                    <div>
                        <span class="font-medium text-gray-700 dark:text-gray-300 theme-transition">{{
                            $t('examples.viewer') }}:</span>
                        <code
                            class="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs break-all text-gray-800 dark:text-gray-200 theme-transition">
              https://www.google.com/maps/d/u/0/viewer?mid=1-g8EcBCaspkcM3_giYHSVtP2LS1HSr8&femb=1&ll=48.132268571799074%2C11.55401675000002&z=13
            </code>
                    </div>

                    <div>
                        <span class="font-medium text-gray-700 dark:text-gray-300 theme-transition">{{
                            $t('examples.embed') }}:</span>
                        <code
                            class="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs break-all text-gray-800 dark:text-gray-200 theme-transition">
              https://www.google.com/maps/d/u/0/embed?mid=1-g8EcBCaspkcM3_giYHSVtP2LS1HSr8&#038;ehbc=2E312F
            </code>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer
            class="mt-16 py-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 theme-transition">
            <div class="max-w-4xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm theme-transition">
                <p>Made with ❤️ using Vue.js and Tailwind CSS</p>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ThemeSwitcher } from './components'

const { locale } = useI18n()

// Reactive data
const inputUrl = ref('')
const extractedMid = ref('')
const isLoading = ref(false)
const scrapedUrls = ref<string[]>([])
const isScrapingUrl = ref(false)
const isScrapingFlow = ref(false)
const scrapingError = ref('')
const copySuccess = ref(false)
const selectedScrapedUrl = ref('')
const scrapedPageSize = ref(0)

// Computed properties
const currentLanguage = computed(() => locale.value)

const urlValidation = computed(() => {   
    extractedMid.value = ''
    scrapedUrls.value = []
    selectedScrapedUrl.value = ''
    scrapedPageSize.value = 0
    isScrapingUrl.value = false
    isScrapingFlow.value = false
    scrapingError.value = ''
    copySuccess.value = false

    if (!inputUrl.value) {
        return { type: 'empty', isValid: false }
    }

    try {
        const url = new URL(inputUrl.value)

        // Check if it's a Google Maps URL
        if (url.hostname.includes('google.com') && url.pathname.includes('/maps/d/')) {
            const mid = extractMidFromUrl(inputUrl.value)
            return {
                type: 'google-maps',
                isValid: !!mid,
                url: url
            }
        }

        // It's a valid URL but not Google Maps
        return {
            type: 'valid-url',
            isValid: true,
            url: url
        }
    } catch (error) {
        return { type: 'invalid-url', isValid: false }
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

const currentGoogleMapsUrl = computed(() => {
    // If we have a direct Google Maps URL input
    if (urlValidation.value.type === 'google-maps' && urlValidation.value.isValid) {
        return inputUrl.value
    }
    // If we have extracted a MID from a scraped URL, reconstruct the viewer URL
    if (extractedMid.value) {
        return `https://google.com/maps/d/u/0/viewer?mid=${extractedMid.value}`
    }
    return ''
})

const formattedPageSize = computed(() => {
    if (scrapedPageSize.value === 0) return ''
    
    const size = scrapedPageSize.value
    if (size < 1024) {
        return `${size} bytes`
    } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`
    } else {
        return `${(size / (1024 * 1024)).toFixed(1)} MB`
    }
})

// Methods
async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text)
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 2000) // Show success for 2 seconds
    } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            copySuccess.value = true
            setTimeout(() => {
                copySuccess.value = false
            }, 2000)
        } catch (fallbackError) {
            console.error('Fallback copy failed:', fallbackError)
        }
        document.body.removeChild(textArea)
    }
}

async function scrapeUrlForGoogleMaps(url: string): Promise<string[]> {
    try {
        isScrapingUrl.value = true
        isScrapingFlow.value = true
        scrapingError.value = '' // Clear any previous errors
        scrapedPageSize.value = 0 // Reset page size

        // Use a CORS proxy to fetch the page content
        const corsProxy = 'https://api.allorigins.win/get?url='
        const response = await fetch(corsProxy + encodeURIComponent(url))

        if (!response.ok) {
            throw new Error(`Network error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (!data.contents) {
            throw new Error('Failed to fetch page content - the page may be empty or blocked')
        }

        const html = data.contents
        scrapedPageSize.value = new Blob([html]).size // Calculate page size in bytes

        // Regex patterns to find Google Maps URLs
        const patterns = [
            /https:\/\/www\.google\.com\/maps\/d\/[^"'\s]+/g,
            /https:\/\/maps\.google\.com\/[^"'\s]+/g,
            /google\.com\/maps\/d\/[^"'\s]+/g
        ]

        const foundUrls = new Set<string>()
        const seenMids = new Set<string>()

        patterns.forEach(pattern => {
            const matches = html.match(pattern)
            if (matches) {
                matches.forEach((match: string) => {
                    // Ensure it starts with https://
                    let cleanUrl = match.startsWith('https://') ? match : `https://${match}`

                    // Normalize by removing www. from Google domains to avoid duplicates
                    cleanUrl = cleanUrl.replace(/https:\/\/www\.google\.com/g, 'https://google.com')

                    try {
                        new URL(cleanUrl) // Validate URL
                        
                        // Extract MID to check for duplicates
                        const mid = extractMidFromUrl(cleanUrl)
                        if (mid && !seenMids.has(mid)) {
                            seenMids.add(mid)
                            foundUrls.add(cleanUrl)
                        }
                        // If MID already seen, skip this URL
                    } catch {
                        // Invalid URL, skip
                    }
                })
            }
        })

        return Array.from(foundUrls)
    } catch (error) {
        console.error('Error scraping URL:', error)

        // Set user-friendly error message
        if (error instanceof TypeError && error.message.includes('fetch')) {
            scrapingError.value = 'Network error: Unable to connect to the website. Please check your internet connection.'
        } else if (error instanceof Error) {
            scrapingError.value = error.message
        } else {
            scrapingError.value = 'An unexpected error occurred while scanning the page.'
        }

        return []
    } finally {
        isScrapingUrl.value = false
    }
}

function extractMidFromUrl(url: string): string | null {
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
    const validation = urlValidation.value
    if (typeof window !== 'undefined') {
        (window as any).plausible?.('ExtractClick')
    }

    if (validation.type === 'invalid-url') {
        return // Show error message through template
    }

    if (validation.type === 'google-maps' && validation.isValid) {
        // Direct Google Maps URL
        isLoading.value = true

        setTimeout(() => {
            const mid = extractMidFromUrl(inputUrl.value)
            if (mid) {
                extractedMid.value = mid
                scrapedUrls.value = [] // Clear any previous scraped URLs
            }
            isLoading.value = false
        }, 100)
        return
    }

    if (validation.type === 'valid-url') {
        // Valid URL but not Google Maps - try to scrape it
        scrapedUrls.value = []
        extractedMid.value = ''
        scrapingError.value = '' // Clear any previous scraping errors

        scrapeUrlForGoogleMaps(inputUrl.value).then(foundUrls => {
            scrapedUrls.value = foundUrls

            // If we found exactly one URL, try to extract its MID automatically
            if (foundUrls.length === 1) {
                const mid = extractMidFromUrl(foundUrls[0])
                if (mid) {
                    extractedMid.value = mid
                }
            }
        })
    }
}

function useScrapedUrl(scrapedUrl: string) {
    const mid = extractMidFromUrl(scrapedUrl)
    if (mid) {
        extractedMid.value = mid
        selectedScrapedUrl.value = scrapedUrl // Track which URL was selected
        //inputUrl.value = scrapedUrl // Update the input to show the selected URL
        //scrapedUrls.value = [] // Clear the scraped URLs list
    }
}

function resetForm() {
    inputUrl.value = ''
    extractedMid.value = ''
    scrapedUrls.value = []
    selectedScrapedUrl.value = ''
    scrapedPageSize.value = 0
    isScrapingUrl.value = false
    isScrapingFlow.value = false
    scrapingError.value = ''
    copySuccess.value = false
}

function switchLanguage() {
    locale.value = locale.value === 'en' ? 'ru' : 'en'
}
</script>
