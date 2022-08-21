<template>
  <v-card :class="{ 'not-visible': invisible }">
    <v-toolbar class="card-toolbar" flat>
      <v-toolbar-title>
        <slot name="headerTitle">
          {{ title }}
        </slot>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <slot name="headerActions"></slot>
      </v-toolbar-items>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text :class="slotClasses" class="visible">
      <slot></slot>
    </v-card-text>

    <v-card-actions v-if="existFooterSlot">
      <v-spacer></v-spacer>

      <slot name="footer"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "{ Título Card }",
    },
    slotClasses: {
      type: String,
      default: "",
    },
    invisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    existFooterSlot() {
      return !!this.$slots.footer;
    },
  },
};
</script>

<style scoped>
.v-toolbar.card-toolbar {
  flex: unset !important;
}
</style>