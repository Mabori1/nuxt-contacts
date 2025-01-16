import type { User } from "~/types";
import { generateUsers } from "~/utils";

export const useUserStore = defineStore("user", () => {
  //define store
  const users: Ref<User[] | undefined> = ref(generateUsers());
  const isVisibleDrawer = ref(false);
  const search = ref("");

  // getters
  // const greetTitle = computed(() => {
  //   if (!title.value) {
  //     return "Hello";
  //   }
  //   return `Hello ${title.value}`;
  // });

  // actions
  const toggleDrawer = () => {
    isVisibleDrawer.value = !isVisibleDrawer.value;
  };

  const addNewUser = (user: User) => {
    users.value?.push(user);
  };

  const deleteUser = (user: User) => {
    users.value = users.value?.filter((u) => u.id !== user.id);
    console.log(users.value);
  };

  const searchUsers = (search: string) => {
    if (search.length > 2) {
      users.value = users.value?.filter((user) => {
        user.name.includes(search) ||
          user.email.includes(search) ||
          user.phone.includes(search);
      });
    }
  };

  return {
    users,
    addNewUser,
    deleteUser,
    toggleDrawer,
    search,
    isVisibleDrawer,
    searchUsers,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
