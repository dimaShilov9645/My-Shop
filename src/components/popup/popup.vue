<template>
  <div class="fixed flex center popup-wrapper" ref="popup-wrapper">
    <div class="fixed padding-2 popup">
      <div class="flex align between popup__header">
        <span class="bold-600">{{ popupTitle }}</span>
        <span>
        <a
            class="close"
            @click="closePopup"
        ></a>
      </span>
      </div>
      <div class="flex align popup__content">
        <slot></slot>
      </div>
      <div class="flex center popup__footer">
        <button
            class="border-none padding margin border-radius font-16 color-white close_modal"
            @click="closePopup"
        >Close
        </button>
        <button
            class="border-none padding margin border-radius font-16 btn"
            @click="rightBtnActions"
        >
          {{ rightBtnTitle }}
        </button>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "popup",
  props: {
    popupTitle: {
      type: String,
      default: 'Popup name'
    },
    rightBtnTitle: {
      type: String,
      default: 'OK'
    }
  },
  data() {
    return {}
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    rightBtnActions() {
      this.$emit('rightBtnTitle')
    }
  },
  mounted() {
    let vm = this;
    document.addEventListener("click", function (item) {
      if (item.target === vm.$refs['popup-wrapper']) {
        vm.closePopup()
      }
    })
  }
}
</script>

<style lang="scss">

.popup-wrapper {
  background: rgba(#080808, .6);
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 9;
  overflow: hidden;
}

.popup {
  top: 50px;
  width: 500px;
  background: $white;
  box-shadow: 0 0 30px 0 #000000;
  z-index: 10;

  &__header {
    margin-bottom: $margin*2;
  }

  &__content {
    justify-content: space-evenly;
  }

  &__footer {
    margin-top: $margin*2;
  }
}

.close_modal {
  background: #fd4f4f;

  &:hover {
    background: red;
  }
}

.close {
  position: absolute;
  right: 15px;
  top: 10px;
  width: 20px;
  height: 20px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  &:before, &:after {
    content: ' ';
    position: absolute;
    left: 15px;
    height: 20px;
    width: 2px;
    background-color: $dark;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
}


</style>