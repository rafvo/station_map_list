import Vue from "vue";

Vue.filter("usToBr", function (value) {
  if (!value) return null;
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
});