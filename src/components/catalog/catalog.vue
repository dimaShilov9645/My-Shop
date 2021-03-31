<template>
  <notifications :messages="messages" />
  <router-link :to="{ name: 'cart', params: { cart_data: cartList } }">
    <div class="fixed padding catalog__link">Cart: {{ cartList.length }}</div>
  </router-link>
  <menu-categories />
  <div class="catalog">
    <div class="flex align between filters">
      <type-select :options="type" />
      <price />
    </div>
    <div class="flex align between catalog-list">
      <catalog-item
        v-for="product in productsOnPage"
        :key="product.article"
        :product_data="product"
        @addToCart="AddToCart"
      />
    </div>
    <pagination />
  </div>
  <size :size_data="size" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MenuCategories from "@/components/menu/menu-categories";
import TypeSelect from "@/components/filters/type-select";
import Price from "@/components/filters/price";
import Size from "@/components/filters/size";
import CatalogItem from "../catalog/catalog-item";
import Notifications from "@/components/notifications/notifications";
import Pagination from "@/components/pagination/pagination";

export default {
  name: "catalog",
  components: {
    MenuCategories,
    TypeSelect,
    Price,
    Size,
    CatalogItem,
    Notifications,
    Pagination,
  },
  props: {},
  data() {
    return {
      type: ["All", "Men", "Women"],
      size: ["XXL", "XL", "L", "M", "S"],
      messages: [],
    };
  },
  computed: {
    ...mapGetters("cart", ["cartList"]),
    ...mapGetters("paginationProducts", ["productsOnPage"])
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),
    ...mapActions("products", ["getProductsApi"]),
    ...mapActions("sortedProducts", ["getSortProducts"]),
    ...mapActions("paginationProducts",["changeCurrentPage"]),
    AddToCart(data) {
      this.addToCart(data).then(() => {
        let timeStamp = Date.now().toLocaleString();
        this.messages.unshift({ name: "Item added to cart", id: timeStamp });
        let vm = this;
        setTimeout(function () {
          vm.messages.splice(vm.messages.length - 1, 1);
        }, 3000);
      });
    }
  },
  mounted() {
    this.getProductsApi().then((response) => {
      if (response.data) {
        this.getSortProducts();
      }
    });
  },
};
</script>

<style lang="scss">
.catalog {
  width: 75%;
  padding: 10px;
  &-list {
    flex-wrap: wrap;
  }

  &__link {
    top: 20px;
    right: 10px;
    border-radius: $radius * 4;
    width: 90px;
    border: 1px solid $white;
    z-index: 10;
    color: $white;

    &:hover {
      border: 1px solid $dark;
      background: $dark;
      cursor: pointer;
    }
  }
}

.filters {
  margin: 30px auto;
}
</style>