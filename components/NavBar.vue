<template>
  <!-- <v-navigation-drawer v-model="isVisibleDrawer" fixed app> -->
  <!-- </v-navigation-drawer> -->
  <v-container>
    <v-navigation-drawer
      v-model="isVisibleDrawer"
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
      prominent
    >
      <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="List Item 1"></v-list-item>
      <v-list-item link title="List Item 2"></v-list-item>
      <v-list-item link title="List Item 3"></v-list-item>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts" setup>
const { isVisibleDrawer } = storeToRefs(useUserStore());
</script>

<style></style>

