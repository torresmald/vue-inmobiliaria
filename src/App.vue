<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
const auth = useAuthStore();
</script>

<template>
  <v-card elevation="3" max-width="1200" class="mx-auto">
    <v-layout>
      <v-app-bar color="blue-darken-1">
        <template v-slot:prepend>
          <v-btn to="/">Vue - Inmobiliaria</v-btn>
        </template>
        <template v-slot:append>
          <div v-if="auth.isLogged">
            <v-btn to="/admin/casas">Admin Panel</v-btn>
            <v-btn @click="auth.logout">Logout</v-btn>
          </div>
          <div v-else>
            <v-btn to="/">Inicio</v-btn>
            <v-btn to="/login">Iniciar Sesion</v-btn>
          </div>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
