<template>
  <div class="background-image">
    <q-page class="row items-center justify-center">
      <q-card class="q-pa-md" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Kullanıcı Girişi</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="user" label="Öğrenci Numarası"></q-input>
          <q-input v-model="password" label="Şifre" type="password"></q-input>

          <!--Şifremi unuttum-->
          <div class="q-mt-sm text-right">
            <q-btn
              flat
              label="ŞİFREMİ UNUTTUM"
              class="text-primary"
              @click="forgotPassword"
            ></q-btn>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="GİRİŞ" color="primary" @click="login"></q-btn>
        </q-card-actions>
      </q-card>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

//reaktik veri tanımları
const oğrenci_numarası = ref("");
const sifre = ref("");

const router = useRouter();

const login = () => {
  console.log("Kullanıcı adı: ${username.value}, Şifre:${password.value}");
  router.push("/home");
};
</script>

<style scoped>
.background-image {
  background-image: url("https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
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
