<template>
  <GenericButton
    :color="color"
    :loading="loading"
    :mdi-icon="mdiIcon"
    :outlined="outlined"
    :text="text"
    :small-icon="smallIcon"
    :small-button="smallButton"
    @click:prevent="(event) => $emit('click:prevent', event)"
  />
</template>

<script>
import GenericButton from "@/components/buttons/GenericButton.vue";

export default {
  components: {
    GenericButton,
  },
  props: {
    color: {
      type: String,
      default: "primary",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    mdiIcon: {
      type: String,
      default: "mdi-window-close",
    },
    text: {
      type: String,
      default: "Fechar",
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    smallButton: {
      type: Boolean,
      default: false,
    },
    smallIcon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
</style>