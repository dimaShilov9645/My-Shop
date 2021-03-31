import { createApp } from "vue";
import { createStore } from "vuex";
import products from "@/store/modules/products";
import sortedProducts from "@/store/modules/sortedProducts";
import paginationProducts from "@/store/modules/paginationProducts";
import cart from "@/store/modules/cart";

const store = createStore({
  state: {
    isMobile: false,
    isDesktop: true,
  },
  getters: {
    IS_MOBILE(state) {
      return state.isMobile;
    },
    IS_DESKTOP(state) {
      return state.isDesktop;
    },
  },
  mutations: {
    SWITCH_MOBILE: (state) => {
      state.isMobile = true;
      state.isDesktop = false;
    },
    SWITCH_DESKTOP: (state) => {
      state.isMobile = false;
      state.isDesktop = true;
    },
  },
  actions: {
    SET_MOBILE({ commit }) {
      commit("SWITCH_MOBILE");
    },
    SET_DESKTOP({ commit }) {
      commit("SWITCH_DESKTOP");
    },
  },
  modules: {
    products,
    sortedProducts,
    paginationProducts,
    cart,
  },
});

const app = createApp({});

app.use(store);

export default store;
