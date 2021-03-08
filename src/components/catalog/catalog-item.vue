<template>
  <popup
      v-if="isInfoPopupVisible"
      rightBtnTitle="Add to cart"
      :popupTitle="product_data.article"
      @closePopup="closeInfoPopup"
      @rightBtnTitle="addToCart"
  >
    <img class="popup-image"
         :src="itemImage"
         alt="img"
    >
    <div class="catalog-item__text">
      <p><span>Name: </span>{{ product_data.name }}</p>
      <p><span>Category: </span>{{ product_data.category }} </p>
      <p><span>Subcategory: </span>{{ product_data.subcategory }} </p>
      <p><span>Type: </span>{{ product_data.type }} </p>
      <p><span>Size: </span>{{ product_data.size.toUpperCase() }} </p>
      <p><span>Price: </span>{{ $filters.toFix(product_data.price) }}</p>
    </div>
  </popup>
  <div class="relative padding-2 catalog-item">
    <img class="catalog-item__image"
         :src="itemImage"
         alt="img"
    >
    <div class="padding font-16 catalog-item__text">
      <p><span>Name: </span>{{ product_data.name }}</p>
      <p><span>In stock: </span>{{ product_data.quantity }}</p>
      <p><span>Price: </span>{{ $filters.toFix(product_data.price) }}</p>
    </div>
    <button
        class="margin border-none border-radius font-16 btn catalog-item__btn"
        @click="addToCart"
    >
      Add to cart
    </button>
    <button
        class="margin border-none border-radius font-16 btn catalog-item__btn"
        @click="showPopupInfo"
    >
      Show info
    </button>
  </div>
</template>

<script>
import Popup from "@/components/popup/popup";
import {mapGetters} from 'vuex'

export default {
  name: "catalog-item",
  emits: ["addToCart"],
  components: {Popup},
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      isInfoPopupVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'CATEGORY'
    ]),
    itemImage() {
      const fileName = this.product_data.category.toLowerCase()
      return require(`../../assets/images/${fileName}/` + this.product_data.image);
    }
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product_data)
    },
    showPopupInfo() {
      this.isInfoPopupVisible = true;
    },
    closeInfoPopup() {
      this.isInfoPopupVisible = false;
    },
  }
}
</script>

<style lang="scss">
.catalog-item {
  flex-basis: 27%;
  margin-bottom: $margin*2;
  box-shadow: 0 0 8px 0 #2c3e50;
  z-index: 0;

  &__image {
    width: 150px;
    height: 150px;
    transition: all 0.5s
  }

  &__text {
    margin-left: $margin*5;
    text-align: left;
    p {
      padding: $padding;
      margin: $margin/2;
    }
  }

  &__btn {
    width: 100px;
    padding: 10px;
  }

  &:hover {
    box-shadow: 0 0 10px 0 #00061a;
    transform: scale(1.02);
  }
}
.popup-image {
  width: 200px;
  height: 200px;
}
</style>