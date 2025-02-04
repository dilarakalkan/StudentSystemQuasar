<template>
  <div class="background-image">
    <q-page class="row items-center justify-center">
      <q-card class="q-pa-md" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Kullanıcı Girişi</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="username" label="Öğrenci Numarası"></q-input>
          <q-input v-model="password" label="Şifre" type="password"></q-input>
          <!--Şifremi unuttum-->
          <div class="q-mt-sm text-right">
            <q-btn
              flat
              label="Şifremi Unuttum"
              class="text-primary"
              @click="forgotPassword"
            ></q-btn>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Giriş" color="primary" @click="login"></q-btn>
        </q-card-actions>
      </q-card>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

//reaktik veri tanımları
const Öğrenci_numarası = ref("");
const şifre = ref("");

const router = useRouter();


const login = () => {
  console.log("Kullanıcı adı: ${username.value}, Şifre:${password.value}");
  router.push("/home");
};
</script>

<style scoped>
.background-image {
  background-image: url(" https://media.istockphoto.com/id/2155852442/tr/foto%C4%9Fraf/sofas-in-the-public-leisure-area-in-the-library.jpg?s=2048x2048&w=is&k=20&c=VxkAevLXydgmVCUIoxQVh2Ond58eTOCJkM-dul1YBs8=");
  background-size: cover; /*tüm alanları kapsar*/
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center; /* içeriği yatayda ortalar */
  align-items: center; /* içeriği dikeyde ortalar */
}

.q-card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
