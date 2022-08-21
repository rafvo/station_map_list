<template>
  <div>
    <SelectField
      :items="stations"
      :loading="loading"
      :label="label"
      item-text="name"
      item-value="id"
      :multiple="multiple"
      :chips="chips"
      :hint="hint"
      :persistent-hint="persistentHint"
      :hide-details="hideDetails"
      :outlined="outlined"
      :dense="dense"
      maxHeight="300px"
      @input="emitInput"
    />
  </div>
</template>

<script>
import SelectField from "./SelectField.vue";

export default {
  components: {
    SelectField,
  },
  props: {
    label: {
      type: String,
      default: "Estações",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: "",
    },
    persistentHint: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    existStations() {
      return this.stations && Object.values(this.stations).length > 0;
    },
    stations() {
      return Object.values(this.$store.state.stations.all);
    },
  },
  methods: {
    getAll() {
      this.loading = true;

      this.$store
        .dispatch("stations/getAll")
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    emitInput(value) {
      this.$emit("input", value);
    },
  },
  mounted() {
    if (!this.existStations) this.getAll();
  },
};
</script>

<style>
</style>