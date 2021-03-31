<template>
  <div class="relative font-16 type-select">
    <p class="padding border-radius pointer title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selectOption }}
    </p>
    <div class="absolute options" v-if="areOptionsVisible">
      <p
          class="m-0 padding border-radius pointer"
          v-for="option in options"
          :key="option.id"
          @click="selectOption = option"
      >{{ option }}</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
  name: "type-select",
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({ 
    areOptionsVisible: false 
  }),
  computed: {
    selectOption: {
      get() {
        return this.$store.state.sortedProducts.type;
      },
      set(value) {
        this.$store.commit('sortedProducts/SET_TYPE', value)
        this.getSortProducts();
      },
    },
  },
  methods: {
     ...mapActions("sortedProducts",["getSortProducts"]),
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeCreate() {
    document.removeEventListener('click', this.hideSelect)
  },
};
</script>

<style lang="scss">

.title {
  border: 1px solid $dark;
}

.type-select {
  width: 200px;
  text-align: left;
  z-index: 1;
}

.options {
  top: 30px;
  left: 0;
  width: 220px;
  border-radius: $radius*3;
  border: 1px solid $light;
  background: $white;

  p:hover {
    background: $light;
    color: $white;
  }
}

</style>