<script setup lang="ts">
import type { User } from "~/types";

defineProps({
  currentUser: {
    required: true,
    type: Object as PropType<User>,
  },
});
const dialog = shallowRef(false);
dialog.value = false;
</script>
<template>
  <div class="ml-auto mr-3">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-icon color="green" v-bind="activatorProps">mdi-account</v-icon>
      </template>
      <v-row>
        <v-col cols="12" md="10">
          <v-card color="light-blue-lighten-2" elevation="8">
            <v-card-item class="d-flex justify-center">
              <div class="mx-auto">
                <v-avatar :image="currentUser.avatarUrl" size="150"></v-avatar>
              </div>
            </v-card-item>
            <v-card-title class="text-h6 text-lg-h5 text-wrap">
              {{ currentUser.name }}
            </v-card-title>
            <v-card-item>
              <div>телефон: {{ currentUser.phone }}</div>
              <div>email: {{ currentUser.email.toLowerCase() }}</div>
              <div>
                дата рождения: {{ currentUser.birthday.toLocaleDateString() }}
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </div>
</template>
