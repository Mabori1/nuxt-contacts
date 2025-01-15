// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import {md2} from 'vuetify/blueprints'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
        ssr: true,
        blueprint: md2
            
        
    // ... your configuration
  })
  app.vueApp.use(vuetify)
})
