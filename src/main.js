import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.scss'
    import TheGallery from "./TheGallery";

    createApp(App).component('the-gallery', TheGallery)
createApp(App).mount('#app')
