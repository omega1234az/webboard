// nuxt.config.js


export default defineNuxtConfig({
  
  ssr: false,
  
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,300&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' },
        { rel: 'icon', href: '' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/sweetalert2@11' }
      ],
      noscript: [],

    },

  },

  modules: ["@nuxt/ui"],

  compatibilityDate: '2024-07-05'
}
);