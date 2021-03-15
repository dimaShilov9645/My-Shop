<template>
  <div class="fixed flex align w-100 padding bg-light header">
    <router-link :to="{name: 'mainPage'}">
      <img class="relative header__img" src="../../../public/logo1.png" alt="" @mouseover="hover = true"
           v-show="hover === false">
      <img class="relative header__img" src="../../../public/logo2.png" alt="" @mouseleave="hover = false"
           v-show="hover === true">
    </router-link>
    <div class="relative flex header-nav">
      <div class="relative flex align header-nav__links">
        <router-link class="color-white padding margin" :to="{name: 'catalog'}">Catalog</router-link>
        <router-link class="color-white padding margin" :to="{name: 'registration'}">Registration</router-link>
        <router-link class="color-white padding margin" :to="{name: 'log-in'}">log in</router-link>
      </div>
      <div class="relative flex search-field">
        <label>
          <input
              class="border-none border-radius padding"
              type="text"
              v-model="searchValue"
          >
        </label>
        <button class="border-none search-field__btn">
          <i class="color-white material-icons md-24 search-field__icons" @click="search(searchValue)">
            search
          </i>
        </button>
      </div>
      <div class="relative none center direction font-18 header-nav__data">
        <p class="color-white">Name</p>
        <p class="color-white">Balance: 0</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "shop-header",
  props: {},
  data() {
    return {
      searchValue: '',
      hover: false
    }
  },
  methods: {
    search(value) {
      if (value) {
        this.GET_SEARCH_VALUE_TO_VUEX(value);
        this.searchValue = '';
        this.$router.push('/catalog')
      }
    },
    ...mapActions([
      'GET_SEARCH_VALUE_TO_VUEX'
    ])
  }
}
</script>

<style lang="scss">

.header {
  top: 0;
  left: 0;
  justify-content: start;
  border-bottom-right-radius: $radius*8;
  border-bottom-left-radius: $radius*2;
  z-index: 9;

  &__img {
    left: 10%;
    width: 150px;
  }

  &-nav {
    left: 8%;

    &__links {
      font-size: 22px;
      font-weight: 900;
    }

    &__data {
      left: 20%;

      p {
        padding: 0 $padding;
      }
    }
  }
}

.search-field {
  left: 15%;
  padding: $padding*2;

  &__btn {
    margin-left: 0;
    background: transparent;
  }

  &__icons {
    transform: scale(1.1);
  }
}

</style>