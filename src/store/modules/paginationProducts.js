import mutations from "@/store/mutations";

const { CURRENT_PAGE } = mutations;

const paginationProducts = {
  namespaced: true,
  state: () => ({
    productsPerPage: 12,
    currentPage: 1,
    quantityPages: 0,
    quantityProducts: 0,
  }),
  getters: {
    currentPage: ({ currentPage }) => currentPage,
    quantityPages: ({ productsPerPage }, getters, rootState) => {
      return Math.ceil(rootState.sortedProducts.sortProducts.length / productsPerPage);
    },
    productsOnPage: ({currentPage,productsPerPage}, getters, rootState) => {
      const start = currentPage * productsPerPage - productsPerPage
      const end = currentPage * productsPerPage;
      return rootState.sortedProducts.sortProducts.slice(start, end);
    }
  },
  mutations: {
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
  },
  actions: {
    changeCurrentPage({ commit }, page) {
      commit(CURRENT_PAGE, page);
      //dispatch("fetchMovies");
    },
  },
};

export default paginationProducts;
