import axios from "@/plugins/axios";
import mutations from "@/store/mutations";

const { PRODUCTS, ALL_CATEGORIES, CATEGORIES } = mutations;

const products = {
  namespaced: true,
  state: () => ({
    products: [],
    allCategories: [],
    categories: [],
  }),
  getters: {
    productList: ({ products }) => products,
    categoryList: ({ categories }) => categories,
    subcategoryList: ({allCategories},getters,{sortedProducts}) => {
      return allCategories.get(sortedProducts.category);
    },
  },
  mutations: {
    [PRODUCTS](state, value) {
      state.products = value;
    },
    [ALL_CATEGORIES](state, value) {
      state.allCategories = value;
    },
    [CATEGORIES](state, value) {
      state.categories = value;
    }
  },
  actions: {
    getProductsApi({ commit }) {
      return axios('/Products.json', {
          method: "GET"
      }).then((products) => {
          commit('PRODUCTS', products.data);
          return products;
      }).then((products) => {
        const allCategories = new Map();
        const categories = [];
        products.data.forEach(function(product) {
          if (allCategories.has(product.category)) {
            const get = allCategories.get(product.category);
            if (get !== product.subcategory && !get.includes(product.subcategory)) {
              get.push(product.subcategory);
              allCategories.set(product.category,  get);
            }
          } else allCategories.set(product.category, [product.subcategory])
        });
        allCategories.forEach(function(val,key) {
          categories.push(key)
        })
        commit('CATEGORIES', categories)
        commit('ALL_CATEGORIES', allCategories)
        return products;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    }
  }
};

export default products;