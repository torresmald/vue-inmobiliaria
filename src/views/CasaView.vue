<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { doc } from "firebase/firestore";
import { useFirestore, useDocument } from "vuefire";
import { formatPrice } from "../helpers/index.js";
import useLocationMap from "@/composables/useLocationMap";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

const { zoom, center, pin } = useLocationMap();

const route = useRoute();
const db = useFirestore();
const docRef = doc(db, "casas", route.params.id);
const casa = useDocument(docRef);

watch(casa, (casa)=> {
    center.value = casa.ubicacion
})

</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h3 text-center font-weight-bold py-3">
      {{ casa?.nombre }}
    </v-card-title>
    <v-img :src="casa?.foto" height="550" cover> </v-img>
    <div
      class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center"
    >
      <v-card-text class="text-h6">
        Precio:
        <span class="font-weight-bold">{{ formatPrice(casa?.precio) }}</span>
      </v-card-text>
      <v-card-text class="text-h6">
        Baños: <span class="font-weight-bold">{{ casa?.baños }}</span>
      </v-card-text>
      <v-card-text class="text-h6">
        Parkings: <span class="font-weight-bold">{{ casa?.garajes }}</span>
      </v-card-text>
      <v-card-text class="text-h6">
        Habitaciones:
        <span class="font-weight-bold">{{ casa?.habitaciones }}</span>
      </v-card-text>
    </div>
    <v-row>
      <v-col cols="12" md="8">
        <div class="text-pre-wrap mt-10 py-10">
          {{ casa?.descripcion }}
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="py-10" style="height: 600px;">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LMarker :lat-lng="center">
                <LPopup> {{ casa?.nombre }} </LPopup>    
            </LMarker>
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
