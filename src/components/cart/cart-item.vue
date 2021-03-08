<template>
  <div class="flex align between padding-2 font-18 cart-item">
    <img
        class="cart-item__image"
        :src="itemImageCart"
        alt="img">
    <div class="flex between cart-item__info">
      <div class="bold-600">
        <p>Article:</p>
        <p>Description:</p>
        <p>Price:</p>
      </div>
      <div>
        <p>{{ cart_item_data.article }}</p>
        <p>{{ cart_item_data.name }}</p>
        <p>{{ $filters.toFix(cart_item_data.price) }}</p>
      </div>
    </div>
    <div>
      <p>Qty:</p>
      <div class="quantity">
        <span class="font-18 quantity__btn btn" @click="decrementItem">-</span>
        {{ cart_item_data.quantity }}
        <span class="font-18 quantity__btn btn" @click="incrementItem">+</span>
      </div>
    </div>
    <button class="border-none padding font-18 border-radius cart-item__btn btn" @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>
export default {
  name: "cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    itemImageCart() {
      const fileName = this.cart_item_data.category.toLowerCase();
      return require(`../../assets/images/${fileName}/`+this.cart_item_data.image);
    }
  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart')
    },
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.cart-item {
  flex-wrap: nowrap;
  box-shadow: 0 0 8px 0 #2c3e50;
  margin-bottom: $margin*2;

  &__image {
    max-width: 150px;
  }
  &__btn {
    width: 100px;
  }
  &__info {
    text-align: left;
    width: 25%;
  }
}

.quantity {
  user-select: none;
  font-size: 20px;
  &__btn {
    display: inline-block;
    user-select: none;
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }
}
</style>