<template>
  <div>
    <CircularProgressIndicator v-if="loading" row-height="100vh" />
    <template v-else>
      <OlMap :features="features" @locationClick="location">
        <StationFilters
          v-model="filtered"
          :station-filter="stationFilter"
          :expand="expand"
          with-ids-filter
          with-type-ids-filter
        />
      </OlMap>
    </template>

    <StationFormModal
      ref="stationFormModal"
      modal-label="Dados da Estação"
      without-activator
      readonly
    />
  </div>
</template>

<script>
import StationFilter from "@/domain/filters/stationFilter";
import Station from "@/domain/models/station";
import StationFilters from "@/components/filters/StationFilters.vue";
import StationFormModal from "@/components/modal/StationFormModal.vue";
import CircularProgressIndicator from "@/components/loaders/CircularProgressIndicator.vue";
import OlMap from "@/components/map/OlMap.vue";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Icon, Style } from "ol/style";

export default {
  components: {
    CircularProgressIndicator,
    StationFilters,
    StationFormModal,
    OlMap,
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
  },
  data() {
    return {
      loading: false,
      filtered: Array.from(new Station()),
    };
  },
  computed: {
    existStations() {
      return this.stations && Object.values(this.stations).length > 0;
    },
    stations() {
      return Object.values(this.$store.state.stations.all);
    },
    features() {
      return this.filtered.reduce((acc, element) => {
        let item = new Feature({
          geometry: new Point([element.longitude, element.latitude]),
          ...element,
        });

        item.setStyle(
          new Style({
            image: new Icon({
              color: element.station_type.color,
              crossOrigin: "anonymous",
              src: require("@/assets/images/location.png"),
            }),
          })
        );

        acc.push(item);

        return acc;
      }, Array.from(new Feature()));
    },
  },
  methods: {
    getAll() {
      this.loading = true;

      this.$store
        .dispatch("stations/getAll", { stationFilter: this.stationFilter })
        .then((data) => {
          this.filtered = data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    location({ props }) {
      const station = new Station(props);
      this.$refs.stationFormModal.openModal({ station: station });
    },
  },
  mounted() {
    this.stationFilter._expand = this.expand;
    this.getAll();
  },
};
</script>

<style>
</style>