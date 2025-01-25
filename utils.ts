import { fakerRU as faker } from "@faker-js/faker";
import type { User } from "./types";

export const generateUsers = () => {
  const dataArray: User[] = [];

  for (let i = 0; i < 100; i++) {
    const sex: "male" | "female" = faker.helpers.arrayElement([
      "male",
      "female",
    ]);

    dataArray[i] = {
      id: i + 1,
      name: faker.person.fullName({ sex }),
      avatarUrl: `https://xsgames.co/randomusers/avatar.php?g=${sex}`,
      email: faker.internet.email(),
      phone: faker.phone
        .number({ style: "national" })
        .toString()
        .replace(/^8/, "+7"),
      birthDate: new Date(faker.date.birthdate()),
      // .toLocaleString("lt", {
      //   year: "numeric",
      //   month: "2-digit",
      //   day: "2-digit",
      // }),
    };
  }
  return dataArray;
};

export function phoneMask(inputStr: string) {
  const strNum = "+7 (___) ___-__-__";

  let charNum = 0;
  let strValue = inputStr.replace(/\D/g, "");

  inputStr = strNum.replace(/./g, function (str) {
    if (/[_\d]/.test(str)) {
      return strValue.charAt(charNum++);
    } else if (charNum >= strValue.length) {
      return "";
    } else {
      return str;
    }
  });
  console.log(inputStr);

  return inputStr;
}
