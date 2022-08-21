<template>
  <main class="wrapper">
    <v-app
      :class="[{ dark: $vuetify.theme.dark }, { light: !$vuetify.theme.dark }]"
    >
      <v-main>
        <template>
          <router-view />
        </template>
      </v-main>
    </v-app>
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
</style>