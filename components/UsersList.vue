<template>
  <VMain>
    <v-data-iterator :items="users" :page="page">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
          <v-card :color="color" class="mx-auto my-0">
            <v-card-item class="d-flex ml-3">
              <div>Id: {{ item.raw.id }}</div>
              <div class="text-h6">ФИО: {{ item.raw.name }}</div>
              <div>Phone: {{ item.raw.phone }}</div>
              <div>Дата рождения: {{ item.raw.birthDate }}</div>
            </v-card-item>
          </v-card>
          <br />
        </template>
      </template>
    </v-data-iterator>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="20"
        :total-visible="5"
        elevation="1"
      ></v-pagination>
    </div>
  </VMain>
</template>

<script lang="ts" setup>
const color = ref("indigo");
const page = ref(1);

const { users } = storeToRefs(useUserStore());
</script>

<style></style>

