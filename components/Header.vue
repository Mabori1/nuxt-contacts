<template>
  <div>
    <v-toolbar
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
      prominent
    >
      <v-app-bar-nav-icon
        @click="useUserStore().toggleDrawer()"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Контакты</v-toolbar-title>

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
      <!-- <v-text-field -->
      <!--   hide-details -->
      <!--   single-line -->
      <!--   v-model="search" -->
      <!--   placeholder="Поиск" -->
      <!-- ></v-text-field> -->
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script lang="ts" setup>
const { search } = storeToRefs(useUserStore());
</script>

<style></style>
