<template>
  <div class="flex align  direction menu">
    <h1
        class="color-light"
        :class="{active__title: selectCategory === ''}"
        @click="selectCategory = '';"
    >
      Categories
    </h1>
    <div class="w-100" v-for="category in categoryList" :key="category.index">
      <label class="flex align w-100 border-radius bg-light menu-categories"
             :class="{bg_dark: selectCategory === category}">
        <input class="none" type="radio" name="radio" :value="category" v-model="selectCategory">
        <p class="absolute padding font-18">{{ category }}</p>
      </label>
      <transition name="subcategory-show">
        <subcategory v-if="selectCategory === category"/>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Subcategory from "@/components/menu/subcategory";

export default {
  name: "menu-categories",
  components: {Subcategory},
  computed: {
    ...mapGetters("products", ["categoryList"]),
    selectCategory: {
      get () {
        return this.$store.state.sortedProducts.category
      },
      set (value) {
        this.$store.commit('sortedProducts/SET_CATEGORY', value)
        this.$store.commit('sortedProducts/SET_SUBCATEGORY', []);
        this.getSortProducts()
      }
    },
  },
  methods: {
    ...mapActions("sortedProducts",["getSubcategory","getSortProducts"]),
  }
};
</script>

<style lang="scss" >

.menu {
  margin: 90px 20px;
  min-width: 18%;
}

.menu-categories {
  height: 40px;
  margin: $margin/2 0;

  p {
    text-align: left;
    z-index: 1;
    color: $white;
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