<template>
  <IconButton
    :color="color"
    :loading="loading"
    :mdi-icon="mdiIcon"
    :small-icon="smallIcon"
    :small-button="smallButton"
    icon
    @click:prevent="(event) => $emit('click:prevent', event)"
  />
</template>

<script>
import IconButton from "@/components/buttons/IconButton.vue";

export default {
  components: {
    IconButton,
  },
  props: {
    color: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    mdiIcon: {
      type: String,
      default: "mdi-window-close",
    },
    smallButton: {
      type: Boolean,
      default: false,
    },
    smallIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>