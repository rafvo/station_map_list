import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import pt from "vuetify/src/locale/pt.ts";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
  },
  lang: {
    locales: { pt },
    current: "pt",
  },
});

/*
 * documentação:
 * https://vuetifyjs.com/en/introduction/why-vuetify/
 */
