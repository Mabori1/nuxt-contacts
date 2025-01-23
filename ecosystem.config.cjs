module.exports = {
  apps: [
    {
      name: "Nuxt-Contacts",
      exec_mode: "cluster",
      port: "3020",
      instances: "max", // Or a number of instances
      script: "./.output/server/index.mjs",
      args: "start",
    },
  ],
};
