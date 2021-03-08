<template>
  <div class="absolute size-wrapper">
    <h1
        class="color-light"
        :class="{active__title: selectedSize === 'All'}"
        @click="selectAll"
    >ALL</h1>
    <label
        class="flex center color-dark"
        v-for="size in size_data"
        :key="size.index"
        :class="{active_color: selectedSize === size}"
        @click="selectSize(size)"
    >
      <input class="none" type="radio" name="radio-size" :value="size" v-model="selectedSize">
      {{ size }}
    </label>
  </div>
</template>

<script>
export default {
  name: "size",
  props: {
    size_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selectedSize: 'All'
    }
  },
  methods: {
    selectSize(selectedSize) {
      this.$emit('size', selectedSize)
    },
    selectAll() {
      this.selectedSize = 'All';
      this.selectSize(this.selectedSize);
    }
  }
}

</script>

<style lang="scss">
.size-wrapper {
  top: 220px;
  right: 4%;

  h1 {
    font-size: 26px;
  }

  label {
    border-radius: 50%;
    padding: $padding/2;
  }
}

</style>