export default {
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products;
    },
    SET_CART: (state, product) => {
        let isProductExist = false;
        state.cart.map(function (item) {
            if (item.article === product.article) {
                isProductExist = true;
                item.quantity++;
            }
        })
        isProductExist || state.cart.push(product);
    },
    DELETE_CART: (state, index) => {
        state.cart[index].quantity = 1;
        state.cart.splice(index, 1);
    },
    INCREMENT: (state, index) => {
        state.cart[index].quantity++
    },
    DECREMENT: (state, index) => {
        if (state.cart[index].quantity > 1) state.cart[index].quantity--
    },
    SWITCH_MOBILE: (state) => {
        state.isMobile = true;
        state.isDesktop = false;
    },
    SWITCH_DESKTOP: (state) => {
        state.isMobile = false;
        state.isDesktop = true;
    },
    SET_SEARCH_VALUE_TO_VUEX: (state, value) => {
        state.searchValue = value;
    },
    SET_CATEGORY: (state, value) => {
        state.category = value;
    },
    SET_SUBCATEGORY: (state, value) => {
        state.subcategory = value;
    },
    SET_PRODUCTS_PAGE: (state, value) => {
        state.productsPage = value;
    }
}