<template>
  <div>
    <v-select
      v-model="Selected"
      :items="options"
      :loading="loading"
      :label="label"
      :item-text="itemText"
      :item-value="itemValue"
      :multiple="multiple"
      :chips="chips"
      :hint="hint"
      :hide-details="hideDetails"
      :outlined="outlined"
      :dense="dense"
      :return-object="returnObject"
      small-chips
      deletable-chips
      :menu-props="{
        maxHeight: '95%'
      }"
      :style="{
        'max-height': maxHeight,
        overflow: overflow,
      }"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template v-slot:prepend-item>
        <div class="sticky-top">
          <v-list-item ripple @mousedown.prevent @click="toggle">
            <v-list-item-action>
              <v-icon
                :color="
                  selected && selected.length > 0 ? 'indigo darken-4' : ''
                "
              >
                {{ icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span v-if="likesAllSelected">Remover todos</span>
                <span v-else>Selecionar todos</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      default: "",
    },
    itemValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Estações",
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
    loading: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: String,
      default: "100%",
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      options: [],
      selected: null,
      overflow: "auto",
    };
  },
  computed: {
    Selected: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = value;

        this.emitInput();
      },
    },
    likesAllSelected() {
      return Boolean(
        this.selected && this.selected.length === this.options.length
      );
    },
    likesSomeSelected() {
      return Boolean(
        this.selected && this.selected.length > 0 && !this.likesAllSelected
      );
    },
    icon() {
      if (this.likesAllSelected) return "mdi-close-box";
      if (this.likesSomeSelected) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  watch: {
    items: {
      handler() {
        this.options = _cloneDeep(this.items);
      },
      deep: true,
    },
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllSelected) {
          this.Selected = [];
        } else {
          this.Selected = this.returnObject
            ? this.options.slice()
            : _cloneDeep(this.optionsUniqueKeys());
        }
      });
    },
    optionsUniqueKeys() {
      return this.options.reduce((acc, element) => {
        acc.push(element[this.itemValue]);
        return acc;
      }, []);
    },
    onFocus() {
      this.overflow = "hidden";
    },
    onBlur() {
      this.overflow = "auto";
    },
    emitInput() {
      this.$emit("input", this.selected);
    },
  },
  mounted() {
    this.options = _cloneDeep(this.items);
  },
};
</script>

<style>
</style>