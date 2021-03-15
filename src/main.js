import { createApp } from 'vue';
import App from './App.vue';
import store from "./store";
import router from "./router";


const app = createApp(App)

app.config.globalProperties.$filters = {
    toFix(value) {
        value = parseFloat(value)
        value = value.toFixed(2)
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽';
    }
}

app.use(store).use(router);
app.mount('#app');
