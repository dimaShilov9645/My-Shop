<template>
  <div class="flex center pagination-wrapper" v-show="quantityPages >= 2">
    <button
        class="margin padding border-none bold-600 font-16 btn"
        @click="paginationBack"
        :disabled="pageNumber===0"
    >back
    </button>
    <p
        class="font-18 bold-600 color-dark"
        v-for="(page, index ) in quantityPages"
        :key="page.index"
        :class="{active_color: index === pageNumber}"
        @click="clickPage(index)"
        v-show="pageNumber+1===index || pageNumber-1===index || pageNumber===index"
    >
      {{ index + 1 }}
    </p>
    <button
        class="margin padding border-none bold-600 font-16 btn"
        @click="paginationNext"
        :disabled="pageNumber===quantityPages-1"
    >next
    </button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "pagination",
  data() {
    return {
      onThePage: 12,
      quantityPages: 0,
      pageNumber: 0,
      quantityProducts: 0,
      products: []
    }
  },
  props: {
    products_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'PRODUCTS_PAGE'
    ]),

  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'GET_PRODUCTS_PAGE'
    ]),
    quantityOnThePage() {
      this.quantityProducts = this.products_data.length
      this.quantityPages = Math.ceil(this.quantityProducts / this.onThePage);
    },
    paginationBack() {
      this.pageNumber--
    },
    paginationNext() {
      this.pageNumber++
    },
    paginationData() {
      const start = this.pageNumber * this.onThePage, end = start + this.onThePage;
      this.products = this.products_data.slice(start, end);
      this.GET_PRODUCTS_PAGE(this.products)
    },
    clickPage(page) {
      this.pageNumber = page
    }

  },
  watch: {
    products_data() {
      this.paginationData()
      this.quantityOnThePage();
      this.pageNumber = 0;
    },
    pageNumber() {
      this.paginationData()
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            this.products = this.products_data
          }
        })

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