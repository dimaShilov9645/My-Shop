import {createApp} from 'vue'
import {createStore} from 'vuex'

import getters from "@/store/getters/getters";
import mutations from "@/store/mutations/mutations";
import apiRequests from "@/store/actions/api-requests"
import commonActions from "@/store/actions/common-actions"

const actions = {...commonActions, ...apiRequests}

const store = createStore({
    state: {
        products: [],
        productsPage: [],
        cart: [],
        isMobile: false,
        isDesktop: true,
        searchValue: '',
        category: '',
        subcategory: [],
    },
    mutations,
    actions,
    getters
});

const app = createApp({})

app.use(store)

export default store;
