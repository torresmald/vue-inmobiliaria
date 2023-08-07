<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useFirestore, useDocument } from "vuefire";
import { doc, updateDoc } from "firebase/firestore";
import { useForm, useField } from "vee-validate";
import { validationSchema, imageSchema } from "@/validation/propiedadSchema";
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";


const { zoom, center, pin } = useLocationMap()
const { uploadImage, isUploaded, url } = useImage();

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});



const route = useRoute();
const db = useFirestore();

const docRef = doc(db, 'casas', route.params.id);
const casa = useDocument(docRef)


const rooms = [1, 2, 3, 4, 5];
const wc = [1, 2, 3];
const parkings = [1, 2];
const nombre = useField("nombre");
const precio = useField("precio");
const foto = useField("foto");
const habitaciones = useField("habitaciones");
const baños = useField("baños");
const garajes = useField("garajes");
const descripcion = useField("descripcion");
const piscina = useField("piscina", null, {
  initialValue: false,
});


const submit = handleSubmit((values) => {
  console.log(values);
});
watch(casa, (casa) => {
  nombre.value.value = casa.nombre
  precio.value.value = casa.precio
  habitaciones.value.value = casa.habitaciones
  baños.value.value = casa.baños
  garajes.value.value = casa.garajes
  descripcion.value.value = casa.descripcion
  piscina.value.value = casa.piscina
  center.value = casa.ubicacion
});
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
        <v-card-title class="mt-5">
            <h1 class="text-h4 font-weight-bold">Editar Propiedad</h1>
        </v-card-title>
        <v-card-subtitle > 
            <p class="text-h5">Edita los detalles de la propiedad</p>
        </v-card-subtitle>

        <v-form class="mt-10">
            <v-text-field
                v-model="nombre.value.value"
                :error-messages="nombre.errorMessage.value"
                label="Nombre"
                class="mb-5"
            ></v-text-field>

            <v-file-input
                v-model="foto.value.value"
                :error-messages="foto.errorMessage.value"
                accept="image/jpeg"
                prepend-icon="mdi-camera"
                label="Fotografía"
                class="mb-5"
                @change="uploadImage"
            ></v-file-input>

            <div class="my-5">
                <p class="font-weight-bold">Imagen Actual:</p>
            </div>


            <v-text-field
                v-model="precio.value.value"
                :error-messages="precio.errorMessage.value"
                label="Precio"
                class="mb-5"
            ></v-text-field>

            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Habitaciones"
                        class="mb-5"
                        :items="rooms"
                        v-model="habitaciones.value.value"
                        :error-messages="habitaciones.errorMessage.value"
                    />
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="WC"
                        class="mb-5"
                        :items="wc"
                        v-model="baños.value.value"
                        :error-messages="baños.errorMessage.value"
                    />
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Lugares Estacionamiento"
                        class="mb-5"
                        :items="parkings"
                        v-model="garajes.value.value"
                        :error-messages="garajes.errorMessage.value"
                    />
                </v-col>
            </v-row>

            <v-textarea
                v-model="descripcion.value.value"
                :error-messages="descripcion.errorMessage.value"
                label="Descripción"
                class="mb-5"
            ></v-textarea>

            <v-checkbox 
                v-model="piscina.value.value"
                label="Piscina"
            ></v-checkbox>


            <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
            <div class="pb-10">
                <div style="height:600px">
                    <LMap 
                        v-model:zoom="zoom" 
                        :center="center" 
                        :use-global-leaflet="false" 
                    >
                        <LMarker
                            :lat-lng="center"
                            draggable
                            @moveend="pin"
                        />
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                    </LMap>
                </div>
            </div>

                <v-btn
                    color="pink-accent-3"
                    block
                    @click="submit"
                >
                    Guardar Cambios
                </v-btn>
        </v-form>
</v-card>

</template>
