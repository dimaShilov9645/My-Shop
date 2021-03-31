<template>
  <Header/>
  <div class="main-wrapper">
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

<style lang="scss" scoped>
.main-wrapper {
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 100px auto;
}
</style>