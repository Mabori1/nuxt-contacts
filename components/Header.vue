<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify";
import { useUserStore } from "~/stores/user";

const { search, users } = storeToRefs(useUserStore());
const router = useRouter();
const { mdAndUp } = useDisplay();
const isHome = computed(() => router.currentRoute.value.path === "/");
</script>
<template>
  <div>
    <v-app-bar
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
      prominent
      elevation="8"
      class="d-flex flex-wrap"
    >
      <v-app-bar-nav-icon
        @click="useUserStore().toggleDrawer"
        color="white"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="text-white">
        {{
          mdAndUp ? `Контакты: ${users?.length}` : users?.length
        }}</v-toolbar-title
      >

      <v-btn
        v-if="mdAndUp"
        class="text-none font-weight-regular"
        prepend-icon="mdi-account"
        text="Добавить контакт"
        variant="flat"
        color="light-blue-darken-2"
        @click="router.push('/create-user')"
      ></v-btn>

      <v-btn
        v-else
        class="text-none font-weight-regular"
        prepend-icon="mdi-account"
        text="+"
        variant="flat"
        color="light-blue-darken-2"
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
        hide-details
        class="opacity-40"
        v-show="isHome"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>
