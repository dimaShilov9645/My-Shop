<template>
  <div class="flex direction w-100 border-radius menu-subcategory">
    <label
      class="border-radius bold-600 color-dark menu-subcategory__item"
      v-for="(subcategory, index) in subcategoryList"
      :key="subcategory.index"
      :for="index"
      :class="{ active_color: subcategoryActive.includes(subcategory) }"
    >
      <input
        class="none"
        type="checkbox"
        v-bind:id="index"
        :value="subcategory"
        v-model="subcategoryActive"
      />
      <p class="margin">{{ subcategory }}</p>
    </label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "subcategory",
  props: {},
  data: () => ({ subcategoryActive: [] }),
  computed: {
    ...mapGetters("products", ["subcategoryList"]),
  },
  methods: {
    ...mapActions("sortedProducts", ["getSortProducts"]),
  },
  watch: {
    subcategoryActive() {
      this.$store.commit("sortedProducts/SET_SUBCATEGORY", this.subcategoryActive);
      this.getSortProducts();
    },
  },
  mounted() {
    this.subcategoryActive = this.$store.state.sortedProducts.subcategory;
  },
};
</script>

<style lang="scss">
.menu-subcategory {
  text-align: left;
  overflow-y: hidden;
  background: $very-light;

  &__item {
    margin-left: $margin * 4;
    font-size: 14px;
  }
}
</style>