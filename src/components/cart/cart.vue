<template>
  <div class="cart">
    <router-link :to="{ name: 'catalog' }">
      <div class="fixed padding catalog__link btn btn-top">Back to Catalog</div>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!cartList.length">There are no products in cart...</p>
    <cart-item
      v-for="(item, index) in cartList"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @increment="incrementCartItem(index)"
      @decrement="decrementCartItem(index)"
    />
    <div class="fixed flex center bg-light color-white cart__total">
      <p class="margin">Total:</p>
      <p>{{ $filters.toFix(cartTotalConst) }}</p>
    </div>
  </div>
</template>

<script>
import CartItem from "../cart/cart-item";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "cart",
  components: { CartItem },
  computed: {
    ...mapGetters("cart", ["cartList"]),
    cartTotalConst() {
      let result = [];
      if (this.cartList.length) {
        for (let item of this.cartList) {
          result.push(item.price * item.quantity);
        }
        result = result.reduce(function (sum, el) {
          return sum + el;
        });
        return result;
      } else {
        return 0;
      }
    },
  },
  methods: {
    ...mapActions("cart", [
      "deleteFromCart",
      "incrementCartItem",
      "decrementCartItem",
    ]),
  },
};
</script>

<style lang="scss">
.cart {
  width: 70%;
  &__total {
    bottom: 0;
    right: 0;
    left: 0;
    padding: $padding * 4 $padding * 3;
    font-size: 26px;
  }
}

.btn-top {
  top: 14px;
}
</style>