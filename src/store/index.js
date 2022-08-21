import Vue from "vue";
import Vuex from "vuex";
import stations from "./modules/stations";
import stationTypes from "./modules/stationTypes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    stations,
    stationTypes
  },
});
