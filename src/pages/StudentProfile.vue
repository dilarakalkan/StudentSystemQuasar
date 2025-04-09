<template>
  <q-page class="bg-grey-1">
    <div class="profile-container q-pa-sm">
      <q-card class="main-profile-card">
        <!-- Üst Banner -->
        <div class="profile-banner">
          <div class="banner-content">
            <q-avatar size="80px" class="profile-avatar">
              <q-icon name="person" size="50px" color="grey-4" />
            </q-avatar>
            <div class="text-center q-mt-sm">
              <div class="text-h5 text-weight-bold text-white">
                Dilara Kalkan
              </div>
              <div class="text-subtitle2 text-grey-4">Öğrenci</div>
            </div>
          </div>
        </div>

        <!-- Bilgi Kartları -->
        <div class="info-grid q-pa-md">
          <q-card flat bordered class="info-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-caption text-grey-6">Ad Soyad</div>
                  <div class="text-subtitle1 q-mt-xs">Dilara Kalkan</div>
                </div>
                <q-icon
                  name="person"
                  size="24px"
                  class="text-primary q-ml-sm"
                />
              </div>
            </q-card-section>
          </q-card>

          <q-card flat bordered class="info-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-caption text-grey-6">E-posta</div>
                  <div class="text-subtitle1 q-mt-xs">
                    dilara.kalkan@std.ankara.edu.tr
                  </div>
                </div>
                <q-icon name="email" size="24px" class="text-primary q-ml-sm" />
              </div>
            </q-card-section>
          </q-card>

          <q-card flat bordered class="info-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-caption text-grey-6">Üniversite</div>
                  <div class="text-subtitle1 q-mt-xs">
                    Ankara Medipol Üniversitesi
                  </div>
                </div>
                <q-icon
                  name="school"
                  size="24px"
                  class="text-primary q-ml-sm"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "StudentProfile",
};
</script>

<style lang="scss" scoped>
.profile-container {
  max-width: 700px;
  margin: 1rem auto;
}

.main-profile-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  background: white;
}

.profile-banner {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
  min-height: 160px;
  position: relative;
}

.banner-content {
  position: relative;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile-avatar {
  background: white;
  padding: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.info-card {
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: var(--q-primary);
  }

  .q-card__section {
    padding: 0.75rem;
  }

  .text-subtitle1 {
    font-weight: 500;
    color: #2c3e50;
  }
}

@media (max-width: 600px) {
  .profile-container {
    margin: 0.5rem;
  }

  .profile-banner {
    min-height: 140px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0.75rem;
  }

  .text-h5 {
    font-size: 1.25rem;
  }

  .profile-avatar {
    width: 70px;
    height: 70px;
  }
}
</style>
