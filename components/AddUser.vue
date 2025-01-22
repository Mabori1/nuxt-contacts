<script setup lang="ts">
import { useField, useForm } from "vee-validate";

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string) {
      if (value?.length >= 10 && /^[А-ЯЁа-яёA-Za-z '-]+$/.test(value))
        return true;

      return "ФИО должно содержать минимум 10 символов.";
    },
    phone(value: string) {
      if (/^[0-9-+]{11,}$/.test(value)) return true;

      return "Введите корректный номер телефона.";
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Введите корректный адрес почты.";
    },
    birthday(value: string) {
      if (/^[0-9-]{10,}$/.test(value)) return true;

      return "Введите корректную дату рождения";
    },
  },
});
const router = useRouter();
const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const birthday = useField("birthday");

const { users, isSnackbar, snackbarText } = storeToRefs(useUserStore());

const onSubmit = handleSubmit((values) => {
  if (users?.value?.length !== undefined) {
    const newUser = {
      id: users.value.length
        ? Math.max(...users.value.map((user) => user.id)) + 1
        : 0,
      name: values.name,
      phone: `+${values.phone}`,
      email: values.email,
      birthDate: new Date(values.birthday)
        .toLocaleString("lt", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .toString(),
    };

    useUserStore().addNewUser(newUser);

    snackbarText.value = "Контакт успешно добавлен";
    isSnackbar.value = true;
    router.push("/");
  }
});
</script>
<template>
  <v-card
    class="mx-auto"
    color="blue"
    width="600"
    prepend-icon="mdi-account"
    title="Создание контакта"
  >
    <v-form @submit.prevent="onSubmit">
      <v-card-text>
        <v-row dense class="d-flex flex-column">
          <v-col cols="12" md="12" sm="6">
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
              v-model="phone.value.value"
              :counter="11"
              :error-messages="phone.errorMessage.value"
              type="number"
              label="Телефон*"
              placeholder="+79182223344"
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
        <v-spacer></v-spacer>

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
      </v-card-actions>
    </v-form>
  </v-card>
</template>
