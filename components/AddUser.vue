<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import type { User } from "~/types";

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string) {
      if (value?.length >= 10 && /^[А-ЯЁа-яёA-Za-z '-]+$/.test(value))
        return true;

      return "ФИО должно содержать минимум 10 символов.";
    },
    phone(value: string) {
      if (/^[0-9-+\s\(\)]{17}$/.test(value)) return true;

      return "Введите корректный номер телефона.";
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Введите корректный адрес почты.";
    },
    birthday(value: string) {
      if (/^[0-9-]{10,}$/.test(value)) {
        if (new Date(value) > new Date())
          return "Дата рождения не может быть в будущем";
        return true;
      }

      return "Введите корректную дату рождения";
    },
  },
});
const router = useRouter();
const name = useField<string>("name");
const phone = useField<string>("phone");
const email = useField<string>("email");
const birthday = useField<Date>("birthday");

const { users, page, isSnackbar, snackbarText } = storeToRefs(useUserStore());

const onSubmit = handleSubmit((values) => {
  if (users?.value?.length !== undefined) {
    const newUser: User = {
      id: users.value.length
        ? Math.max(...users.value.map((user) => user.id)) + 1
        : 0,
      name: values.name,
      phone: values.phone,
      email: values.email,
      birthDate: new Date(values.birthday),
      // birthDate: new Date(values.birthday).toLocaleString("lt", {
      //   year: "numeric",
      //   month: "2-digit",
      //   day: "2-digit",
      // }),
    };

    useUserStore().addNewUser(newUser);

    snackbarText.value = "Контакт успешно добавлен";
    isSnackbar.value = true;
    page.value = Math.ceil(users.value.length / 5);
    router.push("/");
  }
});
</script>
<template>
  <div class="d-flex justify-center">
    <v-card
      class="mx-4 px-2"
      color="blue"
      width="500"
      prepend-icon="mdi-account"
      title="Создание контакта"
      elevation="8"
    >
      <v-form @submit.prevent="onSubmit">
        <v-card-text>
          <v-row dense class="d-flex flex-column">
            <v-col cols="12" md="12" sm="10">
              <v-text-field
                v-model="name.value.value"
                counter="50"
                :error-messages="name.errorMessage.value"
                max-width="500"
                label="ФИО*"
                placeholder="Алексей Иванович Бояров"
                required
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="8" sm="6">
              <v-text-field
                v-maska="'+7(###) ###-##-##'"
                v-model="phone.value.value"
                counter="17"
                :error-messages="phone.errorMessage.value"
                label="Телефон*"
                placeholder="+7(918) 222-33-44"
                clearable
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="8" sm="6">
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="Email*"
                type="email"
                hint="Введите адрес электронной почты"
                placeholder="johndoe@gmail.com"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="5" sm="6">
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
              text="Добавить"
              variant="tonal"
              @click.prevent="onSubmit"
            ></v-btn>
          </div>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
