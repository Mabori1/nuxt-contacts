<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/user";

const { search } = storeToRefs(useUserStore());
const router = useRouter();
</script>
<template>
  <div>
    <v-app-bar
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
      prominent
    >
      <v-app-bar-nav-icon
        @click="useUserStore().toggleDrawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Контакты</v-toolbar-title>

      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-account"
        text="Создать контакт"
        variant="elevated"
        color="primary"
        @click="router.push('/create-user')"
      ></v-btn>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        density="comfortable"
        placeholder="Поиск"
        prepend-inner-icon="mdi-magnify"
        style="max-width: 300px"
        variant="solo"
        clearable
        hide-details
        class="opacity-40"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>
