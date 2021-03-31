import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-shop-a662d-default-rtdb.firebaseio.com",
  params: {
    apikey: "AIzaSyDFgyRMV9scxSI4FNJdna706ObIVAj3ytY",
    plot: "full"
  }
})

//interceptors(instance);

export default instance;