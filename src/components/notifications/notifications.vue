<template>
  <div class="fixed notification">
    <transition-group
        name="transition-animate"
    >
      <div
          class="flex align between padding-2 border-radius bg_dark color-white notification__content"
          v-for="message in messages"
          :key="message.id"
      >
        <div class="flex align between">
          <span>{{ message.name }}</span>
          <i class="material-icons">check_circle</i>
        </div>
        <div class="content__buttons">
          <button v-if="rightButton.length">{{ rightButton }}</button>
          <button v-if="leftButton.length">{{ leftButton }}</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "notifications",
  props: {
    messages: {
      type: Array,
      default: () => {
        return []
      }
    },
    rightButton: {
      type: String,
      default: ''
    },
    leftButton: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">
.notification {
  top: 85px;
  right: 16px;
  z-index: 10;

  &__content {
    height: 50px;
    margin-bottom: $margin*2;
  }
}

.material-icons {
  margin-left: $margin*2;
}

.transition-animate {
  &-enter-from {
    transform: translateX(120px);
    opacity: 0;
  }

  &-enter-active {
    transition: all .6s ease;
  }

  &-enter-to {
    opacity: 1;
  }

  &-leave-from {
    height: 50px;
    opacity: 1;
  }

  &-leave-active {
    transition: transform .6s ease, opacity .6s, height .6s .2s;
  }

  &-leave-to {
    height: 0;
    transform: translateX(120px);
    opacity: 0;
  }

  &-move {
    transition: transform .6s ease;
  }
}

</style>