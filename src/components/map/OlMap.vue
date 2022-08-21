<template>
  <div class="map" id="map" style="width: 100%; height: 100%">
    <div class="map-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature, Overlay } from "ol/index";
import { useGeographic } from "ol/proj";

import "ol/ol.css";

export default {
  components: {},
  provide() {
    return {};
  },
  props: {
    features: {
      type: Array,
      default: () => Array.from(new Feature()),
    },
  },
  data() {
    return {
      map: new Map(),
      vectorLayer: new VectorLayer(),
      vectorSource: new VectorSource(),
      click: false,
    };
  },
  watch: {
    features: {
      handler() {
        this.featuresReload();
      },
      deep: true,
    },
  },
  methods: {
    emitLocationClick(event) {
      this.$emit("locationClick", event);
    },
    emitLocationHover(event) {
      this.$emit("locationHover", event);
    },
    featuresReload() {
      this.vectorSource.clear();
      this.vectorSource.addFeatures(this.features);
      this.vectorSource.changed();
    },
  },
  mounted() {
    const self = this;

    useGeographic();

    self.vectorSource = new VectorSource({
      features: self.features,
    });

    self.vectorLayer = new VectorLayer({
      source: self.vectorSource,
    });

    self.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        self.vectorLayer,
      ],
      view: new View({
        zoom: 0,
        center: [0, 0],
        constrainResolution: true,
      }),
    });

    const element = document.getElementById("popup");

    const popup = new Overlay({
      element: element,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -10],
    });
    self.map.addOverlay(popup);

    self.map.on("click", function (event) {
      this.click = true;

      const feature = self.map.forEachFeatureAtPixel(
        event.pixel,
        function (feature) {
          return feature;
        }
      );

      if (feature) {
        const coordinate = feature.getGeometry().getCoordinates();

        self.emitLocationClick({
          event: event,
          feature: feature,
          props: feature.getProperties(),
          coordinate: coordinate,
        });
      }

      this.click = false;
    });

    self.map.on("pointermove", function (event) {
      if (self.map.hasFeatureAtPixel(event.pixel)) {
        self.map.getViewport().style.cursor = "pointer";

        const feature = self.map.forEachFeatureAtPixel(
          event.pixel,
          function (feature) {
            return feature;
          }
        );

        const coordinate = feature.getGeometry().getCoordinates();

        self.emitLocationHover({
          event: event,
          feature: feature,
          props: feature.getProperties(),
          coordinate: coordinate,
        });
      } else {
        self.map.getViewport().style.cursor = "inherit";
      }
    });
  },
};
</script>

<style scoped>
.map-content {
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 2%;
  left: 5%;
}
</style>