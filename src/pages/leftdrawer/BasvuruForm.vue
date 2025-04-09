<template>
  <q-page class="application-page">
    <!-- Başlık Bölümü -->
    <div class="page-header">
      <h2 class="text-h4">Staj Başvuru Formu</h2>
      <p class="text-subtitle1">Lütfen tüm alanları eksiksiz doldurunuz</p>
    </div>

    <!-- Form Bölümü -->
    <q-form @submit="onSubmit" class="application-form">
      <!-- Kişisel Bilgiler -->
      <div class="form-section">
        <div class="section-header">
          <q-icon name="person" color="primary" size="sm" />
          <h3 class="text-h6">Kişisel Bilgiler</h3>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.name"
              label="Ad Soyad"
              outlined
              class="custom-input"
              :rules="[(val) => !!val || 'Bu alan zorunludur']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.studentId"
              label="Öğrenci Numarası"
              outlined
              class="custom-input"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.email"
              label="E-posta"
              type="email"
              outlined
              class="custom-input"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.phone"
              label="Telefon"
              outlined
              mask="(###) ### ## ##"
              class="custom-input"
            />
          </div>
        </div>
      </div>

      <!-- Eğitim Bilgileri -->
      <div class="form-section">
        <div class="section-header">
          <q-icon name="school" color="primary" size="sm" />
          <h3 class="text-h6">Eğitim Bilgileri</h3>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-select
              v-model="form.faculty"
              :options="faculties"
              label="Fakülte"
              outlined
              class="custom-input"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-select
              v-model="form.department"
              :options="departments"
              label="Bölüm"
              outlined
              class="custom-input"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-select
              v-model="form.grade"
              :options="['1', '2', '3', '4']"
              label="Sınıf"
              outlined
              class="custom-input"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.gpa"
              label="GANO"
              type="number"
              outlined
              class="custom-input"
            />
          </div>
        </div>
      </div>

      <!-- Staj Bilgileri -->
      <div class="form-section">
        <div class="section-header">
          <q-icon name="work" color="primary" size="sm" />
          <h3 class="text-h6">Staj Bilgileri</h3>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-select
              v-model="form.internshipType"
              :options="['Zorunlu Staj', 'Gönüllü Staj']"
              label="Staj Türü"
              outlined
              class="custom-input"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.company"
              label="Şirket Adı"
              outlined
              class="custom-input"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.startDate"
              label="Başlangıç Tarihi"
              type="date"
              outlined
              class="custom-input"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.endDate"
              label="Bitiş Tarihi"
              type="date"
              outlined
              class="custom-input"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="form.description"
              label="Staj Açıklaması"
              type="textarea"
              outlined
              class="custom-input"
            />
          </div>
        </div>
      </div>

      <!-- Belgeler -->
      <div class="form-section">
        <div class="section-header">
          <q-icon name="attach_file" color="primary" size="sm" />
          <h3 class="text-h6">Belgeler</h3>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-file
              v-model="form.transcript"
              label="Transkript"
              outlined
              class="custom-input"
              accept=".pdf"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="col-12">
            <q-file
              v-model="form.internshipForm"
              label="Cv Yükle"
              outlined
              class="custom-input"
              accept=".pdf"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
        </div>
      </div>

      <!-- Form Butonları -->
      <div class="form-actions">
        <q-btn
          label="Temizle"
          type="reset"
          color="grey-7"
          flat
          class="q-mr-sm"
        />
        <q-btn
          label="Başvuruyu Kaydet"
          type="submit"
          color="primary"
          unelevated
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const form = ref({
  name: "",
  studentId: "",
  email: "",
  phone: "",
  faculty: null,
  department: null,
  grade: null,
  gpa: null,
  internshipType: null,
  company: "",
  startDate: "",
  endDate: "",
  description: "",
  transcript: null,
  internshipForm: null,
});

const faculties = [
  "Mühendislik Fakültesi",
  "İktisadi ve İdari Bilimler Fakültesi",
  "Fen Fakültesi",
  "Hukuk Fakültesi",
];

const departments = [
  "Bilgisayar Mühendisliği",
  "Elektrik-Elektronik Mühendisliği",
  "Makine Mühendisliği",
  "Endüstri Mühendisliği",
];

const onSubmit = () => {
  $q.notify({
    type: "positive",
    message: "Başvurunuz başarıyla gönderildi!",
  });
};
</script>
<style scoped>
.application-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8fafc;
}
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.page-header h2 {
  margin: 0;
  font-weight: 700;
}
.page-header p {
  margin-top: 0.5rem;
  opacity: 0.9;
}

.application-form,
.form-section {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 2.5rem;
  border: 1px solid #e2e8f0;
}
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}
.section-header h3 {
  margin: 0 0 0 0.5rem;
  color: #2d3748;
}

.custom-input {
  margin-bottom: 0.5rem;
}
.custom-input :deep(.q-field__control) {
  height: 48px;
}
.custom-input :deep(.q-field__label) {
  top: 12px;
  font-size: 0.95rem;
  color: #4a5568;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}
.form-actions .q-btn {
  min-width: 150px;
  padding: 10px 24px;
}

/* Hover & Focus */
.form-section:hover,
.custom-input:hover :deep(.q-field__control) {
  border-color: #2196f3;
}
:deep(.q-field--outlined .q-field__control:hover),
:deep(.q-field--focused .q-field__control) {
  border-color: #1976d2 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .application-page {
    padding: 1rem;
  }
  .page-header,
  .application-form {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  .form-section {
    padding: 1rem;
  }
  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }
  .form-actions .q-btn {
    width: 100%;
  }
}

/* Animations */
.form-section,
.q-btn {
  transition: all 0.3s ease;
}
.q-btn:hover {
  transform: translateY(-2px);
}

/* Consolidated Border Radius */
:deep(.q-field--outlined .q-field__control) {
  border-radius: 8px;
}
</style>
