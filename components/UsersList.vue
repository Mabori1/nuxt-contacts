<template>
  <VMain>
    <v-data-iterator
      :items="search.length > 2 ? searchResult : users"
      :page="page"
    >
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
        v-if="users?.length && searchResult?.length"
      ></v-pagination>
      <div v-else>Пользователи не найдены</div>
    </div>
  </VMain>
</template>

<script lang="ts" setup>
import type { User } from "~/types";

const color = ref("indigo");
const page = ref(1);
const { users, search } = storeToRefs(useUserStore());
const searchResult = ref<User[] | undefined>([]);

watch(search, async (newSearch) => {
  if (newSearch.length > 2) {
    await nextTick(() => {
      searchResult.value = users.value?.filter((user) => {
        return (
          user.name.toLowerCase().includes(newSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(newSearch.toLowerCase()) ||
          user.phone.toLowerCase().includes(newSearch.toLowerCase()) ||
          user.birthDate.toLowerCase().includes(newSearch.toLowerCase())
        );
      });
    });
  }
  console.log(searchResult.value);
  console.log(newSearch, search.value);
});
</script>

<style></style>

