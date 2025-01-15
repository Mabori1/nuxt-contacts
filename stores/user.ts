export const useUserStore = defineStore("user", () => {
  //define store
  const user: Ref<{
    id: number;
    name: string;
    email: string;
    birthday: string;
  } | null> = ref({
    id: 1,
    name: "John Doe",
    email: "3yPZw@example.com",
    birthday: "2000-01-01",
  });
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
    user,
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

