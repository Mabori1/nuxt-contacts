<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import type { User } from "~/types";

const router = useRouter();
const editUser = ref<User | undefined>(undefined);
editUser.value = useUserStore().users?.find(
  (user) => user.id === Number(router.currentRoute.value.params.id),
);

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string) {
      if (value?.length >= 10 && /^[А-ЯЁа-яёA-Za-z '-]+$/.test(value))
        return true;

      return "ФИО должно содержать минимум 10 символов.";
    },
    phone(value: string) {
      if (/^[0-9-+\(\)\s]{17}$/.test(value)) return true;

      return "Введите корректный номер телефона.";
    },
    email(value: string) {
      if (/^[a-z.-_]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Введите корректный адрес почты.";
    },
    birthday(value: string) {
      if (/^[0-9-]{10,}$/.test(value)) return true;

      return "Введите корректную дату рождения";
    },
  },
});
const name = useField<string | undefined>("name");
const phone = useField<number | undefined>("phone");
const email = useField<string | undefined>("email");
const birthday = useField<string | undefined>("birthday");

const { users, isSnackbar, snackbarText } = storeToRefs(useUserStore());

onMounted(() => {
  name.value.value = editUser.value?.name;
  phone.value.value = Number(
    editUser.value?.phone.replace(/^8/, "7").replace(/[^0-9]/g, ""),
  );
  email.value.value = editUser.value?.email.toLowerCase();
  birthday.value.value = editUser.value?.birthDate.toLocaleString("lt", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
});

const onSubmit = handleSubmit((values) => {
  if (users?.value?.length !== undefined) {
    const editCurrentUser = {
      id: +router.currentRoute.value.params.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
      birthDate: new Date(values.birthday),
    };

    useUserStore().editUser(editCurrentUser);
  }
  router.push("/");
  snackbarText.value = "Контакт успешно отредактирован";
  isSnackbar.value = true;
});
</script>
<template>
  <div class="d-flex justify-center">
    <v-card
      class="mx-4 px-2"
      width="500"
      color="blue"
      prepend-icon="mdi-account"
      title="Редактирование контакта"
    >
      <v-form @submit.prevent="onSubmit">
        <v-card-text>
          <v-row dense class="d-flex flex-column">
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                v-model="name.value.value"
                :counter="50"
                :error-messages="name.errorMessage.value"
                max-width="500"
                label="ФИО*"
                required
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="8" sm="6">
              <v-text-field
                v-maska="'+7(###) ###-##-##'"
                v-model="phone.value.value"
                :counter="17"
                :error-messages="phone.errorMessage.value"
                label="Телефон*"
                clearable
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="8" sm="6">
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                type="email"
                label="Email*"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="birthday.value.value"
                :counter="10"
                :error-messages="birthday.errorMessage.value"
                label="Дата рождения*"
                type="date"
                required
                clearable
              ></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis"
            >* - обязательно для заполнения</small
          >
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="d-flex flex-wrap mx-auto justify-center">
            <v-btn
              text="Отменить"
              variant="plain"
              @click="router.push('/')"
            ></v-btn>

            <v-btn text="Очистить" variant="plain" @click="handleReset"></v-btn>
            <v-btn
              color="primary"
              text="Сохранить"
              variant="tonal"
              @click.prevent="onSubmit"
            ></v-btn>
          </div>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
