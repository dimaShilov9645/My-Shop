<template>
  <div class="flex direction w-100 border-radius menu-subcategory">
    <label
        class="border-radius bold-600 color-dark menu-subcategory__item"
        v-for="(subcategory, index) in sortedSubcategories"
        :key="subcategory.index"
        :for="index"
        :class="{active_color: SUBCATEGORY.includes(subcategory)}"
    >
      <input class="none" type="checkbox" v-bind:id="index" :value="subcategory" v-model="subcategoryActive">
      <p class="margin">{{ subcategory }}</p>
    </label>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "subcategory",
  props: {},
  data() {
    return {
      sortedSubcategories: [],
      subcategoryActive: []
    }
  },
  computed: {
    ...mapGetters([
      'CATEGORY',
      'PRODUCTS',
      'SUBCATEGORY'
    ])
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'GET_SUBCATEGORY'
    ]),
    filteredBySubcategories(category) {
      this.sortedSubcategories = [...this.PRODUCTS];
      this.sortedSubcategories = this.sortedSubcategories.filter(function (item) {
        return item.category === category
      })
      this.sortedSubcategories = this.sortedSubcategories.map(product => product.subcategory);
      this.sortedSubcategories = [...new Set(this.sortedSubcategories)]
    }
  },
  watch: {
    subcategoryActive: function () {
      this.GET_SUBCATEGORY(this.subcategoryActive)
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            this.filteredBySubcategories(this.CATEGORY);
          }
        })
  }
}
</script>

<style lang="scss">

.menu-subcategory {
  text-align: left;
  overflow-y: hidden;
  background: $very-light;

  &__item {
    margin-left: $margin*4;
    font-size: 14px;
  }
}
</style>