<template>
  <div class="login-container">
    <!-- Sol taraf - Bilgi Bölümü -->
    <div class="login-banner">
      <div class="banner-content">
        <h1>Staj Kariyerine İlk Adım</h1>
        <p class="banner-description">
          Türkiye'nin önde gelen şirketlerinde staj fırsatlarını keşfet!
        </p>

        <div class="stats-container">
          <div class="stat-item">
            <q-icon name="business" size="40px" color="white" />
            <div class="stat-info">
              <span class="stat-number">500+</span>
              <span class="stat-label">Şirket</span>
            </div>
          </div>
          <div class="stat-item">
            <q-icon name="work" size="40px" color="white" />
            <div class="stat-info">
              <span class="stat-number">1000+</span>
              <span class="stat-label">Staj İlanı</span>
            </div>
          </div>
          <div class="stat-item">
            <q-icon name="school" size="40px" color="white" />
            <div class="stat-info">
              <span class="stat-number">50K+</span>
              <span class="stat-label">Öğrenci</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sağ taraf - Login Formu -->
    <div class="login-form-container">
      <div class="login-form-wrapper">
        <div class="login-header">
          <h2>Staj Portalına Hoş Geldiniz</h2>
          <p>Kariyerinizi şekillendirmeye başlayın</p>
        </div>

        <div class="login-form">
          <div class="form-group">
            <label>E-posta</label>
            <q-input v-model="email" type="email" outlined class="custom-input">
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>
          </div>

          <div class="form-group">
            <label>Şifre</label>
            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              outlined
              class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <div class="form-options">
            <q-checkbox v-model="rememberMe" label="Beni Hatırla" />
            <q-btn
              flat
              color="primary"
              label="ŞİFREMİ UNUTTUM?"
              class="forgot-password"
            />
          </div>

          <q-btn
            color="primary"
            class="full-width login-btn"
            size="large"
            unelevated
            @click="goToHome"
          >
            GİRİŞ Yap
          </q-btn>

          <div class="social-login">
            <div class="divider">veya</div>
            <div class="social-buttons">
              <q-btn outline class="social-btn" color="primary">
                <q-icon name="fab fa-google" class="q-mr-sm" />
                Google ile devam et
              </q-btn>
              <q-btn outline class="social-btn" color="primary">
                <q-icon name="fab fa-linkedin" class="q-mr-sm" />
                LinkedIn ile devam et
              </q-btn>
            </div>
          </div>

          <div class="register-link">
            Henüz hesabınız yok mu?
            <q-btn flat color="primary" label="Hemen Kaydolun" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const isPwd = ref(true);
const rememberMe = ref(false);

const goToHome = () => {
  router.push("/home");
};
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

.login-banner {
  flex: 1;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  display: flex;
  align-items: center;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.banner-content {
  max-width: 600px;
  position: relative;
  z-index: 1;
}

.banner-content h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.banner-description {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.login-form-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-form-wrapper {
  width: 100%;
  max-width: 440px;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #64748b;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
}

.custom-input {
  border-radius: 8px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
}

.login-btn {
  height: 48px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.social-login {
  margin-top: 2rem;
}

.divider {
  text-align: center;
  position: relative;
  margin: 1.5rem 0;
  color: #64748b;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #e2e8f0;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-btn {
  width: 100%;
  height: 44px;
  border-radius: 8px;
}

.register-link {
  text-align: center;
  margin-top: 2rem;
  color: #64748b;
}

@media (max-width: 1024px) {
  .login-banner {
    display: none;
  }

  .login-form-container {
    flex: 1;
  }
}

@media (max-width: 640px) {
  .login-form-wrapper {
    padding: 2rem;
    box-shadow: none;
  }
}
</style>
