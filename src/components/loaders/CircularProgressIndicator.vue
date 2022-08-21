<template>
  <v-row
    class="fill-height"
    :align="align"
    :justify="justify"
    :style="{
      height: rowHeight,
    }"
  >
    <v-col :align="align">
      <v-progress-circular
        :color="color"
        :size="size"
        :width="width"
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "primary",
    },
    size: {
      type: [String, Number],
      default: 50,
    },
    width: {
      type: [String, Number],
      default: 5,
    },
    rowHeight: {
      type: String,
      default: "100%",
    },
    align: {
      type: String,
      default: "center",
    },
    justify: {
      type: String,
      default: "center",
    },
  },
};
</script>

<style>
</style>