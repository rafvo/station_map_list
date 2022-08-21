<template>
  <div>
    <ValidationProvider
      :vid="providerVid"
      v-slot="{ errors }"
      :name="label"
      :rules="rules"
    >
      <v-text-field
        :ref="uniqueKey"
        v-model="Field"
        :value="bindValue"
        :append-icon="appendIcon"
        :label="label"
        :type="type"
        :error-messages="errors"
        :placeholder="placeholder"
        :id="uniqueKey"
        :name="uniqueNameKey"
        :filled="readonly"
        :readonly="readonly"
        :autofocus="autofocus"
        :disabled="disabled"
        :clearable="!readonly"
        @click:append="emitClickAppend"
      >
        <template v-slot:label>
          <FieldLabel :label="label" :required="requiredLabel" />
        </template>
      </v-text-field>
    </ValidationProvider>
  </div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import FieldLabel from "@/components/label/FieldLabel";

export default {
  components: {
    FieldLabel,
  },
  props: {
    autofocus: {
      type: Boolean,
      default: false,
    },
    appendIcon: {
      type: String,
      default: "",
    },
    bindValue: {
      type: [String, Number],
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: "{ Label }",
    },
    name: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: "",
    },
    rules: {
      type: String,
      default: "",
    },
    requiredLabel: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    vid: {
      type: String,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      field: null,
    };
  },
  computed: {
    Field: {
      get() {
        return this.field;
      },
      set(payload) {
        this.field = payload;

        this.emitInput();
      },
    },
    uniqueKey() {
      return this.id ? `${this.id}` : `${this._uid}`;
    },
    uniqueNameKey() {
      return this.name ? `${this.name}` : `${this._uid}`;
    },
    providerVid() {
      return this.vid ? `${this.vid}` : this.uniqueKey.concat("_provider_vid");
    },
  },
  watch: {
    bindValue() {
      this.field = _cloneDeep(this.bindValue);
    },
    autofocus(isFocus) {
      if (isFocus) {
        this.$refs[this.uniqueKey].focus();
      }
    },
  },
  methods: {
    emitClickAppend(event) {
      this.$emit("click:append", event);
    },
    emitInput() {
      this.$emit("input", this.field);
    },
  },
  created() {
    this.field = _cloneDeep(this.bindValue);
  },
};
</script>

<style>
</style>