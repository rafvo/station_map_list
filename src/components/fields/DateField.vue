<template>
  <div>
    <template v-if="readonly">
      <v-text-field :value="formatDate(bindValue)" readonly filled>
        <template v-slot:label>
          <FieldLabel :label="label" :required="requiredLabel" />
        </template>
      </v-text-field>
    </template>
    <template v-else>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <ValidationProvider v-slot="{ errors }" :name="label" :rules="rules">
            <v-text-field
              v-model="dateFormatted"
              :value="formatDate(bindValue)"
              :error-messages="errors"
              readonly
              v-bind="attrs"
              v-on="on"
              filled
              clearable
            >
              <template v-slot:label>
                <FieldLabel :label="label" :required="requiredLabel" />
              </template>
            </v-text-field>
          </ValidationProvider>
        </template>
        <v-date-picker
          v-model="date"
          :active-picker.sync="activePicker"
          :max="max"
          :min="min"
          locale="pt"
          @change="save"
        ></v-date-picker>
      </v-menu>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import FieldLabel from "@/components/label/FieldLabel";
export default {
  components: {
    FieldLabel,
  },
  props: {
    bindValue: {
      default: null,
    },
    label: {
      type: String,
      default: "Data de Nascimento",
    },
    min: {
      type: String,
      default: "1950-01-01",
    },
    rules: {
      type: String,
      default: "",
    },
    requiredLabel: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      date: null,
      dateFormatted: null,
      menu: false,
      activePicker: null,
    };
  },
  computed: {
    max() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
    bindValue() {
      this.dateFormatted = this.formatDate(this.bindValue);
      this.date = this.parseDate(this.dateFormatted);
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.emitInput();
    },
    formatDate(date) {
      return Vue.filter("usToBr")(date);
    },
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    emitInput() {
      this.$emit("input", this.date);
    },
  },
  created() {
    this.dateFormatted = this.formatDate(this.bindValue);
    this.date = this.parseDate(this.dateFormatted);
  },
};
</script>

<style>
</style>