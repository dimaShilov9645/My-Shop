<template>
  <div class="absolute flex align between direction menu">
    <h1
        class="color-light"
        :class="{active__title: CATEGORY === ''}"
        @click="activeCategories"
    >
      Categories
    </h1>
    <div class="w-100" v-for="category in sortedProducts" :key="category.index">
      <label class="flex align w-100 border-radius bg-light menu-categories"
             :class="{bg_dark: CATEGORY === category}">
        <input class="none" type="radio" name="radio" :value="category" v-model="selectCategory">
        <p class="absolute padding font-18 color-white">{{ category }}</p>
      </label>
      <transition name="subcategory-show">
        <subcategory v-if="CATEGORY === category"/>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Subcategory from "@/components/menu/subcategory";

export default {
  name: "menu-categories",
  components: {Subcategory},
  data() {
    return {
      sortedProducts: [],
      selectCategory: "",
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CATEGORY'
    ]),
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'GET_CATEGORY',
      'GET_SUBCATEGORY'
    ]),
    activeCategories() {
      this.GET_CATEGORY('');
      this.selectCategory = '';
      this.GET_SUBCATEGORY('');
    },
    filteredByCategories() {
      this.sortedProducts = this.PRODUCTS.map(product => product.category);
      this.sortedProducts = [...new Set(this.sortedProducts)]
      return this.sortedProducts
    }
  },
  watch: {
    selectCategory: function () {
      this.GET_CATEGORY(this.selectCategory)
      this.GET_SUBCATEGORY('')
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            this.filteredByCategories();
          }
        })

  }
}
</script>

<style lang="scss">

.menu {
  left: 2%;
  right: 81%;
  top: 170px;
}

.menu-categories {
  height: 40px;
  margin: $margin/2 0;

  p {
    text-align: left;
    z-index: 1;
  }

  &:before {
    content: '';
    left: 0;
    width: 0;
    height: 30px;
    border-radius: $radius*2;
    background: $dark;
    transition: all .5s ease;
  }

  &:hover:before {
    width: 100%;
    height: 40px;
  }
}

.subcategory-show {
  &-enter-from, &-enter-active {
    max-height: 0;
    transition: max-height 0.5s linear;
  }

  &-enter-to, &-leave-from, &-leave-active {
    max-height: 200px;
    transition: max-height 0.5s linear;
  }

  &-leave-to {
    max-height: 0;
    transition: max-height 0.5s linear;
  }
}

</style>