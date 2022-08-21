<template>
  <div>
    <label :class="{ 'required': required }">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "{label}",
    },
  },
};
</script>

<style lang="scss">
label {
  &.required {
    &:after {
      content: "*";
      margin-left: 3px;
      font-weight: bold;
      color: red
    }
  }
}
</style>