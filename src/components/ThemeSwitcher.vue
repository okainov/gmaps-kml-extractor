<template>
  <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 theme-transition">
    <!-- Light Theme Button -->
    <button
      @click="setTheme('light')"
      :class="[
        'p-2 rounded-md transition-all flex items-center space-x-1',
        theme === 'light' 
          ? 'bg-white dark:bg-gray-600 shadow-sm text-yellow-600 dark:text-yellow-400' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
      ]"
      :title="$t('theme.tooltip.light')"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
      </svg>
      <span class="hidden md:inline text-sm font-medium">{{ $t('theme.light') }}</span>
    </button>

    <!-- Dark Theme Button -->
    <button
      @click="setTheme('dark')"
      :class="[
        'p-2 rounded-md transition-all flex items-center space-x-1',
        theme === 'dark' 
          ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
      ]"
      :title="$t('theme.tooltip.dark')"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <span class="hidden md:inline text-sm font-medium">{{ $t('theme.dark') }}</span>
    </button>

    <!-- Auto Theme Button -->
    <button
      @click="setTheme('auto')"
      :class="[
        'p-2 rounded-md transition-all flex items-center space-x-1',
        theme === 'auto' 
          ? 'bg-white dark:bg-gray-600 shadow-sm text-purple-600 dark:text-purple-400' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
      ]"
      :title="$t('theme.tooltip.auto')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <span class="hidden md:inline text-sm font-medium">{{ $t('theme.auto') }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()
const { theme, setTheme } = useTheme()
</script>
