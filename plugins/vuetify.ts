import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from 'vuetify/locale'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        locale: {
            locale: 'fa',
            fallback: 'fa',
            messages: { fa },
            rtl: { fa: true },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
