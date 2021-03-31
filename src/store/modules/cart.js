import mutations from "@/store/mutations";

const { SET_CART, DELETE_CART, INCREMENT, DECREMENT } = mutations;

const cartStore = {
  namespaced: true,
  state: () => ({
    cart: [],
  }),
  getters: {
    cartList: ({ cart }) => cart,
  },
  mutations: {
    [SET_CART](state, product) {
      let isProductExist = false;
      state.cart.map(function(item) {
        if (item.article === product.article) {
          isProductExist = true;
          item.quantity++;
        }
      });
      isProductExist || state.cart.push(product);
    },
    [DELETE_CART](state, index) {
      state.cart[index].quantity = 1;
      state.cart.splice(index, 1);
    },
    [INCREMENT](state, index) {
      state.cart[index].quantity++;
    },
    [DECREMENT](state, index) {
      if (state.cart[index].quantity > 1) state.cart[index].quantity--;
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit("SET_CART", product);
    },
    deleteFromCart({ commit }, index) {
      commit("DELETE_CART", index);
    },
    incrementCartItem({ commit }, index) {
      commit("INCREMENT", index);
    },
    decrementCartItem({ commit }, index) {
      commit("DECREMENT", index);
    },
  },
};

export default cartStore;
