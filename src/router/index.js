import {createWebHistory, createRouter} from "vue-router";
import Catalog from "@/components/catalog/catalog";
import Cart from "@/components/cart/cart";
import MainPage from "@/components/main-page/main-page"
import LogIn from "@/components/log-in/log-in"
import Registration from "@/components/regisration/registration"

const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: MainPage,
    },
    {
        path: '/catalog/',
        name: 'catalog',
        component: Catalog,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
        props: true
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration,
        props: true
    },
    {
        path: '/log-in',
        name: 'log-in',
        component: LogIn,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    //base: process.env.BASE_URL,
    routes
});

export default router;
