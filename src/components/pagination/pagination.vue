<template>
  <div class="flex center pagination-wrapper" v-show="quantityPages >= 2">
    <button
        class="margin padding border-none bold-600 font-16 btn"
        @click="currentPage--"
        :disabled="currentPage===1"
    >back
    </button>
    <p
        class="font-18 bold-600 color-dark"
        v-for="page in quantityPages"
        :key="page.index"
        :class="{active_color: currentPage === page}"
        @click="currentPage = page"
        v-show="quantityPages === page || 1===page || currentPage===page || currentPage+2 === page || currentPage-1 === page || currentPage+1 === page || currentPage-2 === page"
    >
      {{ page }}
    </p>
    <button
        class="margin padding border-none bold-600 font-16 btn"
        @click="currentPage++"
        :disabled="currentPage===quantityPages"
    >next
    </button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "pagination",
  computed: {
    currentPage: {
      get() {
        return this.$store.state.paginationProducts.currentPage
      },
      set(page) {
        this.$store.commit('paginationProducts/CURRENT_PAGE', page);
      }
    },
    ...mapGetters("paginationProducts", ["quantityPages"]),
    ...mapGetters("sortedProducts", ["sortProducts"]),
  },
  watch: {
    sortProducts() {
      if (this.currentPage > this.quantityPages) this.currentPage = 1;
    }
  }
}
</script>

<style lang="scss">
.pagination-wrapper {
  margin-top: $margin*3;

  p {
    padding: $padding/2 $padding;
    margin: $margin/2;
    border-radius: $radius;
  }
  button {
    border-radius: $radius;
  }
}
</style>