<template>
  <q-layout view="hHh Ipr fFf">
    <!-- Üst Menü(Header) -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!--açılabilir kapanabilir olması için menü -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title> Mebis </q-toolbar-title>
        <q-space />
        <q-btn flat icon="logout" label="Çıkış" @click="logout" />
      </q-toolbar>
    </q-header>

    <!-- Yan Menü(Left Drawer) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <!-- Kullancı Bilgileri -->
        <q-item>
          <q-avatar size="xl" class="q-mb-md">
            <img
              src="data:image/jpeg;base64,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"
            />
          </q-avatar>
          <!-- <div class="text-center">Dilara Kallkan</div> -->
          <div class="text-caption">dilara.kalkan@std.ankara.edu.tr</div>
        </q-item>

        <!-- Main Menü -->
        <q-item clickable v-ripple to="/home" class="menu-item">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Ana Sayfa</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/basvuru-form" class="menu-item">
          <q-item-section avatar>
            <q-icon name="campaign" />
          </q-item-section>
          <q-item-section>Başvuru Formu</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/basvuru-ilanlari" class="menu-item">
          <q-item-section avatar>
            <q-icon name="campaign" />
          </q-item-section>
          <q-item-section>Başvuru İlanları</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/calendar" class="menu-item">
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>Başvuru Takvimi</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/submissions" class="menu-item">
          <q-item-section avatar>
            <q-icon name="folder" />
          </q-item-section>
          <q-item-section>Başvurularım</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/payments" class="menu-item">
          <q-item-section avatar>
            <q-icon name="attach_money" />
          </q-item-section>
          <q-item-section>Ödeme İşlemleri</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- ana içerik -->
    <q-page-container>
      <q-page class="q-pa-md">
        <q-layout-grid>
          <q-layout-row justify="start">
            <q-layout-col cols="3" sm="4" md="2" lg="2">
              <!-- Kullanıcı Kartı -->
              <q-card class="q-pa-md card-custom">
                <q-card-section>
                  <div class="text-h6">Kullanıcı</div>
                  <q-btn
                    icon="report_problem"
                    label="Talep/Sorun Bildirim"
                    flat
                  />
                  <q-btn icon="send" label="Başvurularım" flat />
                </q-card-section>
              </q-card>
            </q-layout-col>

            <!-- Kullanıcı Profili Kartı -->
            <q-layout-col cols="3" sm="4" md="2" lg="2">
              <q-card class="q-pa-md card-custom">
                <q-card-section>
                  <div class="text-h6">Kullanıcı Profili</div>
                  <p>YÖNETİM BİLİŞİM SİSTEMLERİ PROGRAMI</p>
                </q-card-section>
                <q-card-section>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="hastag" />
                    </q-item-section>
                    <q-item-section>95210017</q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="school" />
                    </q-item-section>
                    <q-item-section>4. Sınıf</q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="domain" />
                    </q-item-section>
                    <q-item-section>
                      İktisadi, İdari ve Sosyal Bilimler Fakültesi/Türkçe
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </q-layout-col>
          </q-layout-row>
        </q-layout-grid>
      </q-page>
    </q-page-container>
  </q-layout>

  <!-- Footer -->
  <footer class="app-footer">
    <p>Telif hakkı-Tüm hakları saklıdır</p>
  </footer>
</template>

<script setup>
import { ref } from "vue"; //vuedan ref importu

//yan menü için rektif bir durum
import { useRouter } from "vue-router";

const router = useRouter();
// Menü öğelerine tıklandığında yönlendirme yap
const goToPage = (pageName) => {
  router.push({ name: pageName }); // Vue Router ile yönlendirme
};

const logout = () => {
  router.push("login");
};
//navbarın açık kapalı olduğunu kontrol etmek için
const leftDrawerOpen = ref(true);
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align text/icons at the start */
  padding: 15px 20px; /* Uniform padding */
  transition: background-color 0.2s ease;
}

.menu-item + .menu-item {
  margin-top: 10px; /* Equal spacing between each item */
}

.menu-item:hover {
  background-color: #f0f0f0;
  border-radius: 8px;
}

/* İkonlar için genişlik ayarı ve hizalama */
.q-item-section[avatar] {
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.q-item-section {
  font-size: 16px;
  color: #333;
}

.q-item-section:hover {
  color: #1976d2;
}

.q-avatar img {
  border-radius: 50%;
}

/* Sayfa genelinde daha iyi görsel düzen */
.q-drawer {
  width: 260px;
}

.q-toolbar-title {
  font-weight: bold;
  font-size: 20px;
}

.app-footer {
  background-color: rgb(78, 131, 192);
  text-align: center;
  padding: 10px 0;
  color: white;
  font-weight: 500;
}
</style>
