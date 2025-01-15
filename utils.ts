import { fakerRU as faker } from "@faker-js/faker";

export const generateUsers = () => {
  return Array.from({ length: 100 }, (_, v) => ({
    id: v + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "national" }).toString(),
    birthDate: new Date(faker.date.birthdate())
      .toLocaleString("ru-RU", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
      .toString(),
  }));
};
