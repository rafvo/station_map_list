<template>
  <v-btn
    :color="color"
    :icon="icon"
    :loading="loading"
    :outlined="outlined"
    :small="smallButton"
    @click.prevent="(event) => $emit('click:prevent', event)"
  >
    <slot>
      <v-icon v-if="mdiIcon" :small="smallIcon">{{
        mdiIcon
      }}</v-icon>
      <span v-if="!icon" class="ml-2">{{ text }}</span>
    </slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "primary",
    },
    icon: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    mdiIcon: {
      type: String,
      default: "mdi-account",
    },
    text: {
      type: String,
      default: "{ Button Text }",
    },
    outlined: {
      type: Boolean,
      default: false,
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