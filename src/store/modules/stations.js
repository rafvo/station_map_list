import Vue from "vue";
import Axios from "@/api/axios";
import StationFilter from "@/domain/filters/stationFilter";

export default {
  namespaced: true,
  state: {
    all: {},
  },
  getters: {},
  mutations: {
    add(state, model) {
      Vue.set(state.all, model.id, model);
    },
  },
  actions: {
    all({ commit }, all = []) {
      for (let model of all) {
        commit("add", model);
      }
    },
    getAll({ dispatch }, { stationFilter = new StationFilter() } = {}) {
      return new Promise((resolve, reject) => {
        Axios.get("/stations", { params: stationFilter })
          .then((response) => {
            const list = response.data;
            dispatch("all", list);
            resolve(list);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
