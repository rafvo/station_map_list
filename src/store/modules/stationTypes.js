import Vue from "vue";
import Axios from "@/api/axios";

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
    getAll({ dispatch }) {
      return new Promise((resolve, reject) => {
        Axios.get("/station_types")
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
