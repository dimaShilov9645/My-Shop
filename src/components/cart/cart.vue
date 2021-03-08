<template>
  <div class="cart">
    <router-link :to="{name: 'catalog'}">
      <div class="fixed padding catalog__link btn btn-top">Back to Catalog</div>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!CART.length">There are no products in cart...</p>
    <cart-item
        v-for="(item, index) in CART"
        :key="item.article"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"
        @increment="increment(index)"
        @decrement="decrement(index)"
    />
    <div class="fixed flex center bg-light color-white cart__total">
      <p class="margin">Total:</p>
      <p>{{ $filters.toFix(cartTotalConst) }}</p>
    </div>
  </div>
</template>

<script>
import CartItem from "../cart/cart-item";
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "cart",
  components: {CartItem},
  props: {
    cart_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters([
      'CART'
    ]),
    cartTotalConst() {
      let result = [];
      if (this.CART.length) {
        for (let item of this.CART) {
          result.push(item.price * item.quantity)
        }
        result = result.reduce(function (sum, el) {
          return sum + el
        })
        return result
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM'
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    },
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index)
    }
  }
}
</script>

<style lang="scss">
.cart {
  &__total {
    bottom: 0;
    right: 0;
    left: 0;
    padding: $padding*4 $padding*3;
    font-size: 26px;
  }
}

.btn-top {
  top: 14px
}

</style>