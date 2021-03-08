export default {
    ADD_TO_CART({commit}, product) {
        commit('SET_CART', product)
    },
    DELETE_FROM_CART({commit}, index) {
        commit('DELETE_CART', index)
    },
    INCREMENT_CART_ITEM({commit}, index) {
        commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({commit}, index) {
        commit('DECREMENT', index)
    },
    SET_MOBILE({commit}) {
      commit('SWITCH_MOBILE')
    },
    SET_DESKTOP({commit}) {
        commit('SWITCH_DESKTOP')
    },
    GET_SEARCH_VALUE_TO_VUEX ({commit}, value) {
        commit('SET_SEARCH_VALUE_TO_VUEX', value)
    },
    GET_CATEGORY ({commit}, value) {
        commit('SET_CATEGORY', value)
    },
    GET_SUBCATEGORY ({commit}, value) {
        commit('SET_SUBCATEGORY', value)
    }
    ,
    GET_PRODUCTS_PAGE ({commit}, value) {
        commit('SET_PRODUCTS_PAGE', value)
    }
}