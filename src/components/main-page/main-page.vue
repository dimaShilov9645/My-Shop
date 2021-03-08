<template>
  <div class="main-page">
    <h1>My Shop Birds</h1>
    <p>
      <router-link :to="{name: 'catalog'}">
        To Catalog
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "main-page"
}
</script>

<style lang="scss">


</style>