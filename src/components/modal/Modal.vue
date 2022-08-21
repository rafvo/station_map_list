<template>
  <div>
    <GenericButton
      v-if="!withoutActivator"
      :color="iconColor"
      :icon="iconButton"
      :mdi-icon="icon"
      :text="buttonText"
      :loading="isLoadingInButton"
      @click:prevent="openModal()"
    />

    <v-dialog
      v-if="activeModal && !isLoadingInButton"
      v-model="Dialog"
      :persistent="persistent"
      :scrollable="scrollable"
      :fullscreen="fullscreen"
      :max-width="maxWidth"
    >
      <Card slot-classes="modal-body">
        <template #headerTitle>
          {{ modalLabel }}
        </template>

        <template #headerActions>
          <v-row align="center" no-gutters>
            <v-col>
              <CloseModalIconButton @click:prevent="closeModal()" />
            </v-col>
          </v-row>
        </template>

        <CircularProgressIndicator v-if="isLoadingInBody" />
        <slot v-else></slot>

        <template #footer>
          <slot name="footer"></slot>
          <CloseModalButton class="ml-3" @click:prevent="closeModal()" />
        </template>
      </Card>
    </v-dialog>
  </div>
</template>

<script>
import GenericButton from "@/components/buttons/GenericButton.vue";
import CloseModalButton from "@/components/buttons/CloseModalButton.vue";
import CloseModalIconButton from "@/components/buttons/CloseModalIconButton.vue";
import Card from "@/components/cards/Card.vue";
import CircularProgressIndicator from "@/components/loaders/CircularProgressIndicator.vue";

export default {
  components: {
    GenericButton,
    CloseModalButton,
    CloseModalIconButton,
    CircularProgressIndicator,
    Card,
  },
  provide() {
    return {
      openModal: () => this.openModal(),
      closeModal: () => this.closeModal(),
      modalLabel: () => this.modalLabel,
    };
  },
  props: {
    bodyClasses: {
      type: String,
      default: "",
    },
    buttonColor: {
      type: String,
      default: "primary",
    },
    buttonText: {
      type: String,
      default: "Button Label",
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    footerRightAlign: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: "100%",
    },
    icon: {
      type: String,
      default: "",
    },
    iconButton: {
      type: Boolean,
      default: false,
    },
    iconColor: {
      type: String,
      default: "primary",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingInButton: {
      type: Boolean,
      default: false,
    },
    loadingInBody: {
      type: Boolean,
      default: true,
    },
    modalLabel: {
      type: String,
      default: "Modal Title",
    },
    maxWidth: {
      type: String,
      default: "100%",
    },
    open: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: true,
    },
    withoutActivator: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
      activeKey: null,
    };
  },
  computed: {
    Dialog: {
      get() {
        return this.dialog;
      },
      set(isOpen) {
        this.dialog = isOpen;

        this.setActivateKey();
        this.setPageScrolling();
        this.emitState();
        this.emitInput();
      },
    },
    isLoadingInButton() {
      return this.loading && this.loadingInButton;
    },
    isLoadingInBody() {
      return this.loading && this.loadingInBody;
    },
    modalHeight() {
      return this.scrollable ? { height: this.height } : null;
    },
    emitStateEvent() {
      return this.dialog ? "open" : "close";
    },
    uniqueKey() {
      return `${this._uid}`;
    },
    activeModal() {
      return Boolean(this.activeKey == this.uniqueKey);
    },
  },
  watch: {
    open: {
      handler(isOpen) {
        this.dialog = isOpen;
        this.setActivateKey();
        this.setPageScrolling();
      },
    },
  },
  methods: {
    openModal() {
      this.Dialog = true;
    },
    closeModal() {
      this.Dialog = false;
    },
    setActivateKey() {
      this.activeKey = this.dialog ? this.uniqueKey : null;
    },
    setPageScrolling() {
      const htmlElement = document.querySelector("html");
      this.dialog
        ? (htmlElement.style.overflow = "hidden")
        : (htmlElement.style.overflow = "auto");
    },
    emitState() {
      this.$emit(this.emitStateEvent, this.dialog);
    },
    emitInput() {
      this.$emit("input", this.dialog);
    },
  },
  created() {
    this.dialog = this.open;
    this.setActivateKey();
  },
  mounted() {
    this.setPageScrolling();
  },
};
</script>

<style scoped>
</style>