<template>
  <div class="size-wrapper">
    <h1
        class="color-light"
        :class="{active__title: selectedSize === 'All'}"
        @click="selectedSize = 'All';"
    >ALL</h1>
    <label
        class="flex center color-dark"
        v-for="size in size_data"
        :key="size.index"
        :class="{active_color: selectedSize === size}"
    
    >
      <input class="none" type="radio" name="radio-size" :value="size" v-model="selectedSize">
      {{ size }}
    </label>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
  name: "size",
  props: {
    size_data: {
      type: Array,
      default: () => [] 
    }
  },
  computed: {
    selectedSize: {
      get() {
        return this.$store.state.sortedProducts.size
      },
      set(value) {
        this.$store.commit('sortedProducts/SET_SIZE', value);
        this.getSortProducts();
      }
    }
  },
  methods: {
    ...mapActions("sortedProducts",["getSortProducts"])
  },
}

</script>

<style lang="scss">
.size-wrapper {
  min-width: 4%;
  margin: 150px 40px;

  h1 {
    font-size: 26px;
  }

  label {
    border-radius: 50%;
    padding: $padding/2;
  }
}

</style>