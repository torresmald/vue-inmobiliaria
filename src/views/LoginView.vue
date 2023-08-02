<script setup>
import { useField, useForm } from "vee-validate";
import {loginSchema} from '../validation/loginSchema'
const { handleSubmit } = useForm({validationSchema: loginSchema});
const email = useField("email");
const password = useField("password");

const submit = handleSubmit(() => {
    console.log('submit');
});
</script>

<template>
  <v-card flat class="mx-auto mt-10" max-width="600">
    <v-card-title primary-title class="text-h4 font-weight-bold">
      Iniciar Sesion
    </v-card-title>
    <v-form class="mt-5">
      <v-text-field
        name="email"
        label="Email"
        id="email"
        type="email"
        bg-color="blue-grey-lighten-5"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        class="mb-3"
        >
      </v-text-field>
      <v-text-field
        name="password"
        label="Password"
        id="password"
        type="password"
        bg-color="blue-grey-lighten-5"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        class="mb-3"
      >
      </v-text-field>
      <v-btn block color="indigo-darken-3" class="mb-3" @click="submit">Iniciar Sesion</v-btn>
    </v-form>
  </v-card>
</template>
