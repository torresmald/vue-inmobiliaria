<script setup>
import useCasas from "../composables/useCasas.js";
import Casa from "../components/Casa.vue";
const { casasCollection, piscina, casasFiltradas, habitaciones } = useCasas();
import { formatPrice } from "../helpers/index.js";
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">Casas</h1>
  <v-card class="py-10" flat>
    <v-card-title class="text-h5">
      Busqueda:
      <v-checkbox v-model="piscina" label="Piscina"> </v-checkbox>
    </v-card-title>
    <v-card-title class="text-h5">
      Habitaciones:
      <v-select
        v-model="habitaciones"
        label="Select"
        :items="[
          1,
          2,
          3,
          4,
          5,
        ]"
      ></v-select>
    </v-card-title>
    <v-row>
      <Casa v-for="casa in casasFiltradas" :casa="casa" :price="formatPrice" />
    </v-row>
  </v-card>
</template>
