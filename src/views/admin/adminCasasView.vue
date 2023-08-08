<script setup>
import useCasas from "../../composables/useCasas";
import {formatPrice} from '@/helpers/index.js';
const { casasCollection, deleteCasa } = useCasas();
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>
  <v-btn color="blue" variant="flat" to="/admin/agregar-casa"
    >Nueva Propiedad</v-btn
  >
  <v-card class="mx-auto mt-10 flat">
    <v-list>
      <v-list-item v-for="casa in casasCollection">
        <template v-slot:prepend> 
          <v-list-item-media :start="true">
            <img :src="casa.foto" alt="" width="250">
          </v-list-item-media>
        </template>
        <v-list-item-title>
          {{ casa.nombre }}  
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ formatPrice(casa.precio) }}  
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-btn color="info" flat class="mr-2" :to="{name: 'editar-casa', params: {id: casa.id}}">Editar</v-btn>
          <v-btn color="red-darken-3" flat @click="deleteCasa(casa.id, casa.foto)">Eliminar</v-btn>

        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
