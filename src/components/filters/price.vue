<template>
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
        @change="setRangeSlider()"
      />
    </label>
    <label class="range-values">
      <input
        class="border-radius bg-light range-slider__input"
        type="range"
        min="0"
        max="5000"
        step="10"
        v-model.number="maxPrice"
        @change="setRangeSlider()"
      />
      Max: {{ maxPrice }}
    </label>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
  name: "price",
  computed: {
    maxPrice: {
      get () {
        return this.$store.state.sortedProducts.maxPrice
      },
      set (value) {
        this.$store.commit('sortedProducts/SET_MAX_PRICE', value)
        this.getSortProducts();
      }
    },
    minPrice: {
      get () {
        return this.$store.state.sortedProducts.minPrice
      },
      set (value) {
        this.$store.commit('sortedProducts/SET_MIN_PRICE', value)
        this.getSortProducts();
      }
    }
  },
  methods: {
    ...mapActions("sortedProducts",["getSortProducts"]),
    setRangeSlider() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp
      }
    }
  },
}

</script>

<style lang="scss">
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
</style>
