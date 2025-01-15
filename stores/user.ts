import type { User } from "~/types";
import { generateUsers } from "~/utils";

export const useUserStore = defineStore("user", () => {
  //define store
  const users: Ref<User[] | undefined> = ref(generateUsers());
  const title = ref("");
  const isVisibleDrawer = ref(false);
  const search = ref("");

  // getters
  const greetTitle = computed(() => {
    if (!title.value) {
      return "Hello";
    }
    return `Hello ${title.value}`;
  });

  // actions
  const sayHello = (name: string = "Stranger") => {
    alert(`Hello ${name}`);
  };

  const toggleDrawer = () => {
    isVisibleDrawer.value = !isVisibleDrawer.value;
  };

  return {
    users,
    toggleDrawer,
    search,
    isVisibleDrawer,
    title,
    greetTitle,
    sayHello,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

