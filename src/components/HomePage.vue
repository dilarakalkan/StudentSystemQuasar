<template>
  <q-layout view="hHh Ipr fFf">
    <q-header elevated class="header-section">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="menu-button"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>Staj Yönetim Sistemi</q-toolbar-title>
        <q-space />
        <q-btn-group flat>
          <q-btn flat icon="notifications" round>
            <q-badge color="red" floating>3</q-badge>
          </q-btn>
          <q-btn
            flat
            icon="logout"
            label="Çıkış"
            @click="handleLogout"
            class="logout-btn"
          />
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="left-drawer">
      <q-list padding class="menu-list">
        <div class="profile-section clickable" @click="goToStudentProfile">
          <q-avatar size="80px" class="profile-avatar">
            <q-icon name="person" size="50px" color="primary" />
          </q-avatar>
          <div class="profile-info">
            <div class="text-subtitle1 text-weight-bold">Öğrenci Portalı</div>
            <div class="text-caption">dilara.kalkan@std.ankara.edu.tr</div>
          </div>
        </div>

        <q-separator class="q-my-md" />

        <q-item clickable v-ripple to="/home" class="menu-item">
          <q-item-section avatar>
            <q-icon name="home" color="primary" />
          </q-item-section>
          <q-item-section>Ana Sayfa</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/basvuru-form" class="menu-item">
          <q-item-section avatar>
            <q-icon name="description" color="primary" />
          </q-item-section>
          <q-item-section>Başvuru Formu</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/basvuru-ilanlari" class="menu-item">
          <q-item-section avatar>
            <q-icon name="campaign" color="primary" />
          </q-item-section>
          <q-item-section>Başvuru İlanları</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="openInNewTab('/calendars')"
          class="menu-item"
        >
          <q-item-section avatar>
            <q-icon name="calendar_today" color="primary" />
          </q-item-section>
          <q-item-section>Başvuru Takvimi</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/submissions" class="menu-item">
          <q-item-section avatar>
            <q-icon name="folder" color="primary" />
          </q-item-section>
          <q-item-section>Başvurularım</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/payments" class="menu-item">
          <q-item-section avatar>
            <q-icon name="payments" color="primary" />
          </q-item-section>
          <q-item-section>Ödeme İşlemleri</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="page-container">
      <q-page class="q-pa-md">
        <div class="welcome-section">
          <q-card class="welcome-card">
            <q-card-section>
              <div class="text-h5 text-weight-bold">Hoş Geldiniz!</div>
              <div class="text-subtitle2 q-mt-sm">
                Staj başvuru sürecinizi buradan yönetebilirsiniz.
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="dashboard-grid">
          <q-card class="dashboard-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-subtitle2 text-grey-7">Aktif Başvurular</div>
                  <div class="text-h4 text-primary q-mt-sm">3</div>
                </div>
                <q-icon
                  name="description"
                  size="3rem"
                  class="text-primary q-ml-md"
                />
              </div>
            </q-card-section>
          </q-card>

          <q-card class="dashboard-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-subtitle2 text-grey-7">Yeni İlanlar</div>
                  <div class="text-h4 text-positive q-mt-sm">12</div>
                </div>
                <q-icon name="work" size="3rem" class="text-positive q-ml-md" />
              </div>
            </q-card-section>
          </q-card>

          <q-card class="dashboard-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-subtitle2 text-grey-7">
                    Bekleyen İşlemler
                  </div>
                  <div class="text-h4 text-warning q-mt-sm">2</div>
                </div>
                <q-icon
                  name="pending"
                  size="3rem"
                  class="text-warning q-ml-md"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="notifications-section">
          <q-card class="notification-card">
            <q-card-section>
              <div class="text-h6 q-mb-md">Son Bildirimler</div>
              <q-list separator>
                <q-item v-ripple clickable class="notification-item">
                  <q-item-section avatar>
                    <q-icon name="notifications" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Yeni staj ilanı eklendi</q-item-label>
                    <q-item-label caption>2 saat önce</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-ripple clickable class="notification-item">
                  <q-item-section avatar>
                    <q-icon name="event" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Başvuru son tarihi yaklaşıyor</q-item-label>
                    <q-item-label caption>1 gün önce</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const leftDrawerOpen = ref(true);

const openInNewTab = (path) => {
  const baseUrl = window.location.origin;
  window.open(baseUrl + path, "_blank");
};

const handleLogout = () => {
  window.location.href = "http://localhost:3000/";
};

const goToStudentProfile = () => {
  router.push("/student-profile");
};
</script>

<style scoped>
.header-section {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.left-drawer {
  background: #ffffff;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

.profile-section {
  padding: 24px 16px;
  text-align: center;
  background: linear-gradient(to bottom, #f5f5f5, #ffffff);
}

.profile-avatar {
  margin-bottom: 12px;
  background: #e3f2fd;
  box-shadow: 0 4px 8px rgba(25, 118, 210, 0.1);
}

.menu-item {
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: #e3f2fd;
  transform: translateX(4px);
}

.page-container {
  background: #f5f7fa;
  min-height: 100vh;
}

.welcome-card {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.2);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 24px 0;
}

.dashboard-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.notification-card {
  border-radius: 12px;
  margin-top: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.notification-item {
  transition: background-color 0.3s ease;
}

.notification-item:hover {
  background: #f5f5f5;
}

.logout-btn {
  transition: all 0.3s ease;
  border-radius: 8px;
  font-weight: 500;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.profile-section.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
}

.profile-section.clickable:hover {
  background: linear-gradient(to bottom, #e3f2fd, #ffffff);
  transform: translateY(-2px);
}

.profile-section.clickable:active {
  transform: translateY(0);
}

.profile-info {
  margin-top: 8px;
  transition: all 0.3s ease;
}

.profile-section.clickable:hover .profile-info {
  color: #1976d2;
}

.profile-section.clickable:hover .profile-avatar {
  box-shadow: 0 6px 12px rgba(25, 118, 210, 0.2);
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .welcome-card {
    margin: 12px;
  }

  .profile-section {
    padding: 16px;
  }

  .menu-item {
    padding: 12px;
  }

  .q-page {
    padding: 16px !important;
  }
}

.q-btn {
  transition: all 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.q-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
</style>
