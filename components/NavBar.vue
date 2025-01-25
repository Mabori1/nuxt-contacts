<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/user";

const { isVisibleDrawer } = storeToRefs(useUserStore());
const router = useRouter();
</script>
<template>
  <v-container>
    <v-navigation-drawer
      v-model="isVisibleDrawer"
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
      temporary
    >
      <v-list-item title="Мои контакты" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <v-list-item
        link
        title="Добавить контакт"
        @click="router.push('/create-user')"
      ></v-list-item>
      <v-list-item
        link
        title="Техническое задание"
        @click="router.push('/tz')"
      ></v-list-item>
    </v-navigation-drawer>
  </v-container>
</template>
