<script setup>
import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useForm, useField } from "vee-validate";
import { validationSchema, imageSchema } from "@/validation/propiedadSchema";
import { useRouter } from "vue-router";
import useImage from '@/composables/useImage';

const { uploadImage, isUploaded, url } = useImage()

const router = useRouter()
const rooms = [1, 2, 3, 4, 5];
const wc = [1, 2, 3];
const parkings = [1, 2];

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});

const nombre = useField("nombre");
const precio = useField("precio");
const foto = useField("foto");
const habitaciones = useField("habitaciones");
const baños = useField("baños");
const garajes = useField("garajes");
const descripcion = useField("descripcion");
const piscina = useField("piscina", null, {
  initialValue: false
});

const db = useFirestore()

const submit = handleSubmit(async (values) => {

  const {foto, ...casa} = values;
  const docRef = await addDoc(collection(db, "casas"), {
    ...casa,
    foto: url.value
  });
  if(docRef.id){
    router.push('/admin/casas')
  }
});
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title primary-title class="text-h4 font-weight-bold">
      Nueva Propiedad
    </v-card-title>
    <v-form class="mt-10">
      <v-text-field
        name="nombre"
        label="Titulo Casa"
        class="mb-5"
        v-model="nombre.value.value"
        :error-messages="nombre.errorMessage.value"
      />
      <v-file-input
        accept="image/jpg"
        label="Foto Casa"
        prepend-icon="mdi-home"
        class="mb-5"
        v-model="foto.value.value"
        :error-messages="foto.errorMessage.value"
        @change="uploadImage"
      />
      <div v-if="isUploaded" class="my-5">
        <p class="font-weight-bold mb-2">Imagen de Casa</p>
        <img :src="isUploaded" alt="Imagen Casa" class="w-50">
      </div>
      <v-text-field
        name="precio"
        label="Precio"
        class="mb-5"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      />
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            clearable
            chips
            label="Habitaciones"
            :items="rooms"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            clearable
            chips
            label="Baños"
            :items="wc"
            v-model="baños.value.value"
            :error-messages="baños.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            clearable
            chips
            label="Garajes"
            :items="parkings"
            v-model="garajes.value.value"
            :error-messages="garajes.errorMessage.value"
          />
        </v-col>
      </v-row>
      <v-textarea
        label="Descripcion"
        rows="3"
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
      >
      </v-textarea>
      <v-checkbox
        label="Piscina"
        prepend-icon="mdi-pool"
        v-model="piscina.value.value"
      >
      </v-checkbox>
      <v-btn color="blue" block height="50" @click="submit">Agregar</v-btn>
    </v-form>
  </v-card>
</template>
