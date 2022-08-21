<template>
  <Modal
    ref="modal"
    :open="open"
    :loading="loading"
    :modal-label="modalLabel"
    :icon-button="iconButton"
    :icon="icon"
    :icon-color="iconColor"
    :button-text="buttonText"
    scrollable
    footer-right-align
    :without-activator="withoutActivator"
    @input="emitInput"
    @close="emitClose"
  >
    <StationForm
      class="mt-20"
      ref="stationForm"
      :station-id="stationId"
      :station="station"
      :loading="loading"
      :readonly="readonly"
    />
  </Modal>
</template>

<script>
import Station from "@/domain/models/station";
import Modal from "@/components/modal/Modal.vue";
import StationForm from "@/components/forms/StationForm.vue";

export default {
  components: {
    Modal,
    StationForm,
  },
  props: {
    buttonText: {
      type: String,
      default: "{ Button Label }",
    },
    iconButton: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconColor: {
      type: String,
      default: "primary",
    },
    open: {
      type: [Number, Boolean],
      default: false,
    },
    stationId: {
      type: [String, Number],
      default: null,
    },
    station: {
      type: Object,
      default: () => new Station(),
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    modalLabel: {
      type: String,
      default: '{ Label }' 
    },
    withoutActivator: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  methods: {
    getUserById() {
      this.loading = true;
      this.$store
        .dispatch("users/getId", this.userId)
        .then((data) => {
          const model = data.user;
          this.user.create(new Station(model));
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    openModal({ station = {} }){
      this.station.create(station);

      this.$refs.modal.openModal();
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
    emitClose(event) {
      this.$emit("close", event);
    },
    emitInput(payload) {
      this.$emit("input", payload);
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>