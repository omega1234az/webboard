// nuxt.config.js


export default defineNuxtConfig({
  
  
  
  routeRules: {'/posts': { ssr: true },},
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+Thai:wght@100..900&display=swap'},
        { rel: 'icon', href: '' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/sweetalert2@11'}
      ],
      noscript: [],
      

    },

  },
  
  runtimeConfig: {
    public: {
      ApiBase: process.env.API_BASE, 
    }
  },
  
  
  modules: ["@nuxt/ui","@nuxt/fonts"],
 
  

  compatibilityDate: '2024-07-05'
}
);