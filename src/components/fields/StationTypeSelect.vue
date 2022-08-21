<template>
  <div>
    <SelectField
      :items="stationTypes"
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
      default: "Tipos Estações",
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
    existStationTypes() {
      return this.stationTypes && Object.values(this.stationTypes).length > 0;
    },
    stationTypes() {
      return Object.values(this.$store.state.stationTypes.all);
    },
  },
  methods: {
    getAll() {
      this.loading = true;

      this.$store
        .dispatch("stationTypes/getAll")
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
    if (!this.existStationTypes) this.getAll();
  },
};
</script>

<style>
</style>