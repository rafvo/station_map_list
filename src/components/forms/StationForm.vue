<template>
  <div>
    <CircularProgressIndicator v-if="loading" />
    <template v-else>
      <ValidationObserver ref="observer">
        <v-form ref="form">
          <Card :invisible="!withCard">
            <v-row>
              <v-col cols="12" xs="12" md="2">
                <TextField
                  v-model="station.id"
                  :bind-value="station.id"
                  label="Identificador"
                  rules="required"
                  required-label
                  readonly
                />
              </v-col>
              <v-col cols="12" xs="12" md="4">
                <TextField
                  v-model="station.name"
                  :bind-value="station.name"
                  :readonly="readonly"
                  label="Estação"
                  rules="required"
                  required-label
                />
              </v-col>
              <v-col cols="12" xs="12" md="3">
                <TextField
                  v-model="station.latitude"
                  :bind-value="station.latitude"
                  :readonly="readonly"
                  label="Latitude"
                  rules="required"
                  required-label
                />
              </v-col>
              <v-col cols="12" xs="12" md="3">
                <TextField
                  v-model="station.longitude"
                  :bind-value="station.longitude"
                  :readonly="readonly"
                  label="Longitude"
                  rules="required"
                  required-label
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" xs="12" md="2">
                <TextField
                  v-model="station.elevation_meters"
                  :bind-value="station.elevation_meters"
                  :readonly="readonly"
                  label="Elevação (m²)"
                  rules=""
                />
              </v-col>

              <v-col cols="12" xs="12" md="3">
                <DateField
                  v-model="station.operation_start_date"
                  :bind-value="station.operation_start_date"
                  :readonly="readonly"
                  label="início da Operação"
                  rules=""
                />
              </v-col>

              <v-col cols="12" xs="12" md="3">
                <DateField
                  v-model="station.operation_end_date"
                  :bind-value="station.operation_end_date"
                  :readonly="readonly"
                  label="Fim da Operação"
                  rules=""
                />
              </v-col>

               <v-col cols="12" xs="12" md="4">
                <TextField
                  v-model="station.station_type.name"
                  :bind-value="station.station_type.name"
                  :readonly="readonly"
                  label="Tipo de Estação"
                  rules="required"
                  required-label
                />
              </v-col>
            </v-row>
          </Card>
        </v-form>
      </ValidationObserver>
    </template>
  </div>
</template>

<script>
import CircularProgressIndicator from "@/components/loaders/CircularProgressIndicator.vue";
import TextField from "@/components/fields/TextField.vue";
import DateField from "@/components/fields/DateField.vue";
import Card from "@/components/cards/Card.vue";
import Station from "@/domain/models/station";

export default {
  components: {
    CircularProgressIndicator,
    TextField,
    DateField,
    Card,
  },
  props: {
    stationId: {
      type: [String, Number],
      default: null,
    },
    station: {
      type: Object,
      default: () => new Station(),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    withCard: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      inserting: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>