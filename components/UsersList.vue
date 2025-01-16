<template>
  <v-data-iterator :items="itemUser" :page="page">
    <template v-slot:default="{ items }">
      <template v-for="(item, i) in items" :key="i">
        <v-card
          :color="color"
          class="mx-auto position-relative"
          max-width="500"
        >
          <v-card-item class="d-flex ml-3">
            <div class="d-flex justify-space-between">
              Id: {{ item.raw.id }}
              <v-icon
                class="position-absolute right-0"
                @click="useUserStore().deleteUser(item.raw)"
                color="red"
                >mdi-delete</v-icon
              >
            </div>
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
      :length="totalPages"
      :total-visible="5"
      elevation="1"
      v-show="isPaginationVisible"
    ></v-pagination>
    <div v-if="isUserNotFound" class="text-h5 mt-8">
      Пользователи не найдены
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "~/types";

const color = ref("indigo");
const page = ref(1);
const totalPages = ref(20);
const { users, search } = storeToRefs(useUserStore());
const searchResult = ref<User[] | undefined>([]);
const isPaginationVisible = ref(true);
const isUserNotFound = ref(false);
let itemUser = search.value.length > 2 ? searchResult.value : users.value;

watch(search, async (newSearch) => {
  if (newSearch.length > 2) {
    await nextTick(() => {
      updateTotalPages();
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
  isPaginationVisible.value = paginationShow();
});

onMounted(() => updateTotalPages());
onUpdated(() => {
  isUserNotFound.value = isUserNotFoundShow();
});

const paginationShow = () => {
  if (
    (users.value?.length !== undefined &&
      users.value.length <= 5 &&
      search.value.length < 2) ||
    (searchResult.value?.length !== undefined &&
      searchResult.value.length <= 5 &&
      search.value.length > 2)
  ) {
    return false;
  }
  return true;
};

const isUserNotFoundShow = () => {
  if (
    (users.value?.length !== undefined &&
      !users.value.length &&
      search.value.length < 2) ||
    (searchResult.value?.length !== undefined &&
      !searchResult.value.length &&
      search.value.length > 2)
  ) {
    return true;
  }
  return false;
};

const updateTotalPages = () => {
  if (search.value.length > 2 && searchResult.value !== undefined) {
    totalPages.value = Math.ceil(searchResult.value.length / 5);
  } else if (users.value !== undefined) {
    totalPages.value = Math.ceil(users.value.length / 5);
  }
};
</script>

<style></style>
