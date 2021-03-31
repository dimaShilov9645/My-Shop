import mutations from "@/store/mutations";

let productsSearch = [];

const {
  SET_CATEGORY,
  SET_SUBCATEGORY,
  SET_MIN_PRICE,
  SET_MAX_PRICE,
  SET_SIZE,
  SET_TYPE,
  SET_SEARCH_VALUE,
  SET_SORT_PRODUCTS,
} = mutations;

const sortedProducts = {
  namespaced: true,
  state: () => ({
    category: "",
    subcategory: [],
    maxPrice: 5000,
    minPrice: 0,
    size: "All",
    type: "All",
    searchValue: "",
    sortProducts: [],
  }),
  getters: {
    sortProducts: ({ sortProducts }) => sortProducts,
    sortByCategory: ({ category }) => {
      if (category !== "") {
        productsSearch = productsSearch.filter(function(item) {
          return item.category === category;
        });
      }
      return productsSearch;
    },
    sortBySubcategory: ({ subcategory }) => {
      if (subcategory.length) {
        productsSearch = productsSearch.filter(function(item) {
          return subcategory.includes(item.subcategory);
        });
      }
      return productsSearch;
    },
    sortByPrice: ({ maxPrice, minPrice }) => {
      productsSearch = productsSearch.filter(function(item) {
        return item.price >= minPrice && item.price <= maxPrice;
      });
      return productsSearch;
    },
    sortBySize: ({ size }) => {
      if (size !== "All") {
        productsSearch = productsSearch.filter(function(e) {
          return e.size === size.toLowerCase();
        });
      }
      return productsSearch;
    },
    sortByType: ({ type }) => {
      if (type !== "All" && type.length) {
        productsSearch = productsSearch.filter(function(e) {
          return e.type === type;
        });
      }
      return productsSearch;
    },
    sortBySearchValue: ({ searchValue }) => {
      if (searchValue.length) {
        productsSearch = productsSearch.filter(function(item) {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
      }
      return productsSearch;
    },
  },
  mutations: {
    [SET_CATEGORY](state, value) {
      state.category = value;
    },
    [SET_SUBCATEGORY](state, value) {
      state.subcategory = value;
    },
    [SET_MAX_PRICE](state, value) {
      state.maxPrice = value;
    },
    [SET_MIN_PRICE](state, value) {
      state.minPrice = value;
    },
    [SET_SIZE](state, value) {
      state.size = value;
    },
    [SET_TYPE](state, value) {
      state.type = value;
    },
    [SET_SEARCH_VALUE](state, value) {
      state.searchValue = value;
    },
    [SET_SORT_PRODUCTS](state, value) {
      state.sortProducts = value;
    },
  },
  actions: {
    getSortProducts({ getters, commit, rootState }) {
      productsSearch = rootState.products.products;
      const { sortByCategory,sortBySubcategory,sortByType,sortBySize,sortByPrice,sortBySearchValue} = getters;
      sortBySearchValue,sortByCategory,sortBySubcategory,sortByType,sortBySize,sortByPrice;
      
      commit("SET_SORT_PRODUCTS", productsSearch);
      commit("SET_SEARCH_VALUE", "");
    },
  },
};

export default sortedProducts;
