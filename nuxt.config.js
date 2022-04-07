import { resolve } from "path";

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  /*
   ** Global CSS
   */
  css: [
    { src: "element-ui/lib/theme-chalk/index.css" },
    { src: "./assets/styles/common.scss" },
  ],
  router: {},
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: "~plugins/element-ui",
      ssr: true,
    },
    {
      src: "~/plugins/http",
      ssr: true,
    },
    {
      src: "~/plugins/qs",
      ssr: true,
    },
    {
      src: "~/plugins/getError",
      ssr: true,
    },
  ],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    "@nuxtjs/style-resources",
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://http.nuxtjs.org
    "@nuxt/http",
    "@nuxtjs/style-resources",
  ],
  styleRosources: {
    scss: [],
    hoistUseStatements: true, // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },
  http: {
    proxy: true,
  },
  /*
   ** Server Middleware
   */
  serverMiddleware: {
    "/api": "~/api",
  },
  /*
   ** For deployment you might want to edit host and port
   */
  // server: {
  //  port: 8000, // default: 3000
  //  host: '0.0.0.0' // default: localhost
  // },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  // srcDir: "uploads/",
};
