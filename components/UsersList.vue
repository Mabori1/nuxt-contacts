<script lang="ts" setup>
import type { User } from "~/types";
import EditUser from "./EditUser.vue";
import { nextTick, onMounted, onUpdated, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/user";

const color = ref("indigo");
const { isSnackbar, snackbarText, users, search, page, totalPages } =
  storeToRefs(useUserStore());
const searchResult = ref<User[] | undefined>([]);
const isPaginationVisible = ref(true);
const isUserNotFound = ref(false);
const itemUsers = ref<User[] | undefined>([]);

watch(search, async (newSearch) => {
  if (newSearch.length > 2) {
    await nextTick(() => {
      updateTotalPages();
      searchResult.value = users.value?.filter((user: User) => {
        return (
          user.name.toLowerCase().includes(newSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(newSearch.toLowerCase()) ||
          user.phone.toLowerCase().includes(newSearch.toLowerCase()) ||
          user.birthDate.toLowerCase().includes(newSearch.toLowerCase())
        );
      });
    });
  }
  paginationShow();
});

watch(users, (_) => {
  paginationShow();
  setItemUsers();
  updateTotalPages();
});

onMounted(() => {
  updateTotalPages();
  setItemUsers();
});
onUpdated(() => {
  isUserNotFoundShow();
  updateTotalPages();
});

const setItemUsers = () => {
  itemUsers.value = search.value.length > 2 ? searchResult.value : users.value;
};

const paginationShow = () => {
  if (
    (users.value?.length !== undefined &&
      users.value.length <= 5 &&
      search.value.length < 2) ||
    (searchResult.value?.length !== undefined &&
      searchResult.value.length <= 5 &&
      search.value.length > 2)
  ) {
    isPaginationVisible.value = false;
  }
  isPaginationVisible.value = true;
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

<template>
  <v-data-iterator :items="itemUsers" :page="page">
    <template v-slot:default="{ items }">
      <template v-for="(item, i) in items" :key="i">
        <v-card :color="color" class="mx-auto" max-width="500">
          <v-card-item class="ml-3">
            <div class="d-flex justify-space-between">
              Id: {{ item.raw.id }}
              <EditUser :edit-user="item.raw" />
              <v-icon @click="useUserStore().deleteUser(item.raw)" color="red"
                >mdi-delete</v-icon
              >
            </div>
            <div class="text-h6">ФИО: {{ item.raw.name }}</div>
            <div>Phone: {{ item.raw.phone }}</div>
            <div>
              Дата рождения:
              {{
                new Date(item.raw.birthDate)
                  .toLocaleString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .toString()
              }}
            </div>
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

  <v-snackbar color="green" v-model="isSnackbar" :timeout="3000" class="mb-4">
    {{ snackbarText }}
    <template v-slot:actions>
      <v-btn color="black" variant="text" @click="isSnackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
