// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/styles/main.scss', '@/assets/fonts/index.scss', 'vuetify/lib/styles/main.sass'],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@pinia/nuxt',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      // baseURL: process.env.BASEURL
    }
  }
})
