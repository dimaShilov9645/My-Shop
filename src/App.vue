<template>
  <main-wrapper/>
</template>

<script>

import MainWrapper from "@/components/main-wrapper";
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'app',
  components: {
    MainWrapper
  },
  computed: {
    ...mapGetters([
      'IS_MOBILE',
      'IS_DESKTOP'
    ])
  },
  methods: {
    ...mapActions([
      'SET_MOBILE',
      'SET_DESKTOP'
    ]),
  },
  mounted() {
    let vm = this;
    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) {
        vm.SET_DESKTOP()
      } else {
        vm.SET_MOBILE()
      }
    })
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
