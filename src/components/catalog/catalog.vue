<template>
  <notifications
      :messages="messages"
  />
  <router-link :to="{name: 'cart', params:{cart_data: CART}}">
    <div class="fixed padding catalog__link">Cart: {{ CART.length }}</div>
  </router-link>
  <size :size_data="size" @size="filtered(selectedType,$event)"/>
  <menu-categories/>
  <div class="catalog">
    <div class="flex align between filters">
      <type-select
          :selected="selectedType"
          :options="type"
          @select="filtered($event,selectedSize)"
      />
      <div class="relative flex align between text range-slider">
        <label class="range-values">
          Min: {{ minPrice }}
          <input
              class="border-radius bg-light range-slider__input"
              type="range"
              min="0"
              max="5000"
              step="10"
              v-model.number="minPrice"
              @change="setRangeSlider(); filtered()"
          >
        </label>
        <label class="range-values">
          <input
              class="border-radius bg-light range-slider__input"
              type="range"
              min="0"
              max="5000"
              step="10"
              v-model.number="maxPrice"
              @change="setRangeSlider(); filtered()"
          >
          Max: {{ maxPrice }}
        </label>
      </div>
    </div>
    <div class="flex align between catalog-list">
      <catalog-item
          v-for="product in PRODUCTS_PAGE"
          :key="product.article"
          :product_data="product"
          @addToCart="addToCart"
      />
    </div>
    <pagination :products_data="sortedProducts"/>
  </div>
</template>

<script>

import CatalogItem from "../catalog/catalog-item";
import {mapActions, mapGetters} from 'vuex'
import TypeSelect from "@/components/filters/type-select";
import Notifications from "@/components/notifications/notifications";
import MenuCategories from "@/components/menu/menu-categories";
import Size from "@/components/filters/size";
import Pagination from "@/components/pagination/pagination";

export default {
  name: "catalog",
  components: {
    Pagination,
    TypeSelect,
    Size,
    MenuCategories,
    Notifications,
    CatalogItem,
  },
  props: {},
  data() {
    return {
      type: ['All', 'Men', 'Women'],
      size: ['XXL', 'XL', 'L', 'M', 'S'],
      selectedType: 'All',
      selectedSize: 'All',
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 5000,
      messages: [],
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CART',
      'IS_DESKTOP',
      'IS_MOBILE',
      'SEARCH_VALUE',
      'CATEGORY',
      'SUBCATEGORY',
      'PRODUCTS_PAGE'
    ]),

  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART',
      'GET_CATEGORY',
      'GET_PRODUCTS_PAGE',
      'GET_SEARCH_VALUE_TO_VUEX'
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data)
          .then(() => {
            let timeStamp = Date.now().toLocaleString();
            this.messages.unshift(
                {name: 'Item added to cart', id: timeStamp}
            )
            let vm = this;
            setTimeout(function () {
              vm.messages.splice(vm.messages.length - 1, 1)
            }, 3000)
          })
    },
    filtered(type, size) {
      this.sortedProducts = [...this.PRODUCTS];
      this.sortedProducts = this.sortByCategory(this.CATEGORY);
      this.sortedProducts = this.sortBySubcategory(this.SUBCATEGORY);
      this.sortedProducts = this.sortByPrice();
      this.sortedProducts = this.sortByType(type);
      this.sortedProducts = this.sortBySize(size);
    },
    sortByCategory(category) {
      if (category !== '') {
        this.sortedProducts = this.sortedProducts.filter(function (item) {
          return item.category === category
        })
      }
      return this.sortedProducts
    },
    sortBySubcategory(subcategories) {
      if (subcategories.length) {
        this.sortedProducts = this.sortedProducts.filter(function (item) {
          return subcategories.includes(item.subcategory)
        })
      }
      return this.sortedProducts
    },
    sortBySize(size = this.selectedSize) {
      if (size !== 'All') {
        this.sortedProducts = this.sortedProducts.filter(function (e) {
          return e.size === size.toLowerCase()
        })
      }
      this.selectedSize = size;
      return this.sortedProducts
    },
    sortByPrice() {
      let vm = this;
      this.sortedProducts = this.sortedProducts.filter(function (item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice
      })
      return this.sortedProducts
    },
    sortByType(type = this.selectedType) {
      if (type !== 'All' && type.length) {
        this.sortedProducts = this.sortedProducts.filter(function (e) {
          return e.type === type
        })
      }
      this.selectedType = type;
      return this.sortedProducts
    },
    setRangeSlider() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp
      }
    },
    sortProductsBySearchValue(value) {
      if (value) {
        this.sortedProducts = [...this.PRODUCTS]
        this.sortedProducts = this.sortedProducts.filter(function (item) {
          return item.name.toLowerCase().includes(value.toLowerCase())
        })
      }
      this.GET_SEARCH_VALUE_TO_VUEX('')
      this.GET_CATEGORY('')
      return this.sortedProducts
    }
  },
  watch: {
    SEARCH_VALUE() {
      this.sortProductsBySearchValue(this.SEARCH_VALUE)
    },
    CATEGORY() {
      if (this.CATEGORY !== '') {
        this.filtered()
      }
    },
    SUBCATEGORY() {
      this.filtered()
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            this.filtered(this.selectedType, this.selectedSize)
            this.sortProductsBySearchValue(this.SEARCH_VALUE)
          }
        })
  }
}
</script>

<style lang="scss">
.catalog {
  &-list {
    flex-wrap: wrap;
  }

  &__link {
    top: 20px;
    right: 10px;
    border-radius: $radius*4;
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

.range-slider {
  width: 300px;
  margin: auto $margin*2;

  label {
    color: $dark;
  }

  &__input {
    -webkit-appearance: none;
    height: 8px;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: $light-dark;

      &:hover {
        background: $dark;
        cursor: pointer;
      }
    }

    &::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: $dark;
    }
  }
}

.range-slider svg, .range-slider input[type=range] {
  position: absolute;
  left: 25%;
  bottom: 15%;
}

input[type=range]::-webkit-slider-thumb {
  position: relative;
  top: 2px;
  margin-top: -7px;
  z-index: 2;
}

.main-wrapper {
  margin-left: 21%;
  margin-right: 10%;
}

</style>