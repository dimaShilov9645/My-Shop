import axios from "axios";

export default {
    GET_PRODUCTS_FROM_API({commit}) {
        return axios('http://localhost:3000/Products', {
            method: "GET"
        })
            .then((products) => {
                commit('SET_PRODUCTS_TO_STATE', products.data);
                console.log(products);
                return products;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }
}