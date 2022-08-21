<template>
  <div>
    <v-row>
      <v-col v-if="withIdsFilter" cols="12" xs="12" md="3">
        <StationSelect
          v-model="stationFilter.id"
          multiple
          outlined
          persistent-hint
          hide-details
          chips
          dense
        />
      </v-col>

      <v-col v-if="withTypeIdsFilter" cols="12" xs="12" md="3">
        <StationTypeSelect
          v-model="stationFilter.station_type_id"
          multiple
          outlined
          persistent-hint
          hide-details
          chips
          dense
        />
      </v-col>

      <v-col v-if="withTypeIdsFilter" cols="12" md="2">
        <GenericButton
          :loading="loading"
          text="Consultar"
          mdi-icon="mdi-magnify"
          @click:prevent="getAll"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StationFilter from "@/domain/filters/stationFilter";
import Station from "@/domain/models/station";
import StationSelect from "@/components/fields/StationSelect.vue";
import StationTypeSelect from "@/components/fields/StationTypeSelect.vue";
import GenericButton from "@/components/buttons/GenericButton.vue";

export default {
  components: {
    StationSelect,
    StationTypeSelect,
    GenericButton,
  },
  props: {
    stationFilter: {
      type: Object,
      default: () => new StationFilter(),
    },
    expand: {
      type: String,
      default: "station_type",
    },
    withIdsFilter: {
      type: Boolean,
      default: false,
    },
    withTypeIdsFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      filtered: Array.from(new Station()),
    };
  },
  computed: {
    Filtered: {
      get() {
        return this.filtered;
      },
      set(value) {
        this.filtered = value;

        this.emitInput();
      },
    },
    Loading: {
      get() {
        return this.loading;
      },
      set(value) {
        this.loading = value;

        this.emitLoading();
      },
    },
  },
  methods: {
    getAll() {
      this.Loading = true;

      this.$store
        .dispatch("stations/getAll", { stationFilter: this.stationFilter })
        .then((data) => {
          this.Filtered = data;
          this.Loading = false;
        })
        .catch(() => {
          this.Loading = false;
        });
    },
    emitInput() {
      this.$emit("input", this.filtered);
    },
    emitLoading() {
      this.$emit("loading", this.loading);
    },
  },
  mounted() {
    this.stationFilter._expand = this.expand;
  },
};
</script>

<style>
</style>