<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "~/stores/user";
import type { User } from "~/types";
import UserDialog from "./UserDialog.vue";

const color = ref("indigo");
const {
  searchUsers,
  isSnackbar,
  snackbarText,
  users,
  search,
  page,
  totalPages,
} = storeToRefs(useUserStore());
const isPaginationVisible = ref(true);
const itemUsers = ref<User[] | undefined>([]);
const router = useRouter();

watch(search, (newSearch) => {
  if (newSearch.length > 2) {
    searchUsers.value = users.value?.filter(
      (user: User) =>
        user.name.toLowerCase().includes(newSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(newSearch.toLowerCase()) ||
        user.phone.toLowerCase().includes(newSearch.toLowerCase()),
    );
    setItemUsers();
  }
  setItemUsers();
});

watch(users, () => {
  setItemUsers();
});
watch(searchUsers, () => {
  setItemUsers();
});

onMounted(() => {
  setItemUsers();
});

const setItemUsers = () => {
  itemUsers.value = search.value.length > 2 ? searchUsers.value : users.value;
  if (itemUsers.value?.length) {
    isPaginationVisible.value = true;
    totalPages.value = Math.ceil(itemUsers.value.length / 5);
  } else {
    isPaginationVisible.value = false;
  }
};
</script>

<template>
  <v-data-iterator :items="itemUsers" :page="page">
    <template
      v-slot:default="{ items }"
      class="d-flex items-center flex-column"
    >
      <template v-for="(item, i) in items" :key="i">
        <div class="d-flex justify-center">
          <v-card
            :color="color"
            class="mx-2 p-4"
            width="500"
            border
            elevation="8"
          >
            <v-card-item class="ml-3">
              <div class="d-flex justify-space-between align-center">
                Id: {{ item.raw.id }}

                <UserDialog class="ml-auto" :current-user="item.raw" />

                <v-icon
                  @click="router.push('/edit-user/' + item.raw.id)"
                  size="28"
                  color="green"
                  class="mx-1"
                  >mdi-account-edit</v-icon
                >
                <v-icon
                  class="ml-2"
                  size="28"
                  @click="useUserStore().deleteUser(item.raw)"
                  color="red"
                  >mdi-delete</v-icon
                >
              </div>
              <div class="text-h6">ФИО: {{ item.raw.name }}</div>
              <div>Phone: {{ item.raw.phone }}</div>
              <div>
                Дата рождения:
                {{
                  new Date(item.raw.birthday)
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
        </div>

        <br />
      </template>
    </template>
  </v-data-iterator>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalPages"
      :total-visible="5"
      elevation="3"
      v-if="isPaginationVisible"
      size="small"
    ></v-pagination>
    <div v-else class="text-h5 mt-8">Пользователи не найдены</div>
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
