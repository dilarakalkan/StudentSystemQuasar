<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const $q = useQuasar();

//navbar kontrol
const leftDrawerOpen = ref(false);

//kullanıcı çıkışı için yönlendirme
const logout = () => {
  router.push("/login");
};

onMounted(() => {
  leftDrawerOpen.value = $q.screen.gt.sm;
});
</script>
