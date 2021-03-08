<template>
  <Header/>
  <div class="padding main-wrapper">
    <router-view></router-view>
  </div>
  <Footer/>
</template>

<script>

import Header from '@/components/layouts/header'
import Footer from "@/components/layouts/footer";

export default {

  name: "main-wrapper",
  components: {
    Footer,
    Header
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.main-wrapper {
  flex: 1 0 auto;
  max-width: 900px;
  margin: 100px auto;
}
</style>