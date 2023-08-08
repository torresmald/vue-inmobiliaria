<script setup>

defineProps({
    casa: {
        type: Object
    },
    price: {
        type: Function 
    }
});
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
        <v-img :src="casa.foto" height="200" cover>
        </v-img>
        <v-card-title class="font-weight-bold">
            {{ casa.nombre }}
        </v-card-title>
        <v-card-text class="text-truncate">
            {{ casa.descripcion }}
        </v-card-text>
        <v-card-text class="text-h5 font-weight-bold">
            Precio: {{ price(casa.precio) }}
        </v-card-text>
        <template v-slot:actions>
            <v-btn color="info" block variant="flat" :to="{name: 'casa', params: {id: casa.id}}">Ver Detalles</v-btn>
        </template>
    </v-card>
  </v-col>
</template>

