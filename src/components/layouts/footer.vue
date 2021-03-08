<template>
  <div class="flex center w-100 bg-light footer">
    <h1 class="padding m-0 color-white">Footer</h1>
  </div>
</template>

<script>
export default {
  name: "main-footer"
}
</script>

<style lang="scss">
.footer {
  flex: 0 0 auto;
  height: 80px;
  border-top-right-radius: $radius*5;
  border-top-left-radius: $radius*3;
}
</style>