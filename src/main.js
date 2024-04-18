import { createApp } from 'vue';
import router from './Router';
import i18n from './i18n';
// Css
import './assets/Css/Font-Family.css';
import './assets/Css/Font-Icon.css';
import './assets/Css/Main.css';
// Components
import App from './App.vue';

createApp(App).use(router).use(i18n).mount('#app');