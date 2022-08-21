<template>
  <GenericButton
    :color="color"
    :loading="loading"
    :mdi-icon="mdiIcon"
    :small="small"
    icon
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
      default: "mdi-account",
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>