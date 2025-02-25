<template>
  <q-page class="q-pa-md bg-gradient">
    <q-card class="q-pa-md form-card">
      <q-card-section>
        <div class="text-center">
          <h2 class="text-primary q-mb-md">🎓 Öğrenci Staj Başvuru Formu</h2>
          <p class="form-subtitle">
            Lütfen aşağıdaki bilgileri eksiksiz doldurun.
          </p>
        </div>

        <q-form @submit.prevent="submitApplication" class="q-gutter-md">
          <q-input
            v-model="form.name"
            label="Ad Soyad"
            filled
            dense
            required
            prefix-icon="person"
          />
          <q-input
            v-model="form.school"
            label="Okul"
            filled
            dense
            required
            prefix-icon="school"
          />
          <q-input
            v-model="form.department"
            label="Bölüm"
            filled
            dense
            required
            prefix-icon="work"
          />
          <q-input
            v-model="form.gpa"
            label="Okul Ortalaması (örn: 3.40)"
            filled
            dense
            type="number"
            step="0.01"
            min="0"
            max="4"
            required
            prefix-icon="trending_up"
          />

          <q-select
            v-model="form.experience"
            :options="['Var', 'Yok']"
            label="Staj Deneyimi"
            filled
            dense
            required
            prefix-icon="history_edu"
          />

          <q-select
            v-model="form.duration"
            :options="['20 Gün', '60 Gün', '6 Ay']"
            label="Staj Süresi"
            filled
            dense
            required
            prefix-icon="schedule"
          />

          <q-input
            v-model="form.phone"
            label="Telefon Numarası"
            filled
            dense
            mask="(###) ### ## ##"
            required
            prefix-icon="phone"
          />

          <q-input
            v-model="form.email"
            label="E-posta Adresi"
            type="email"
            filled
            dense
            required
            prefix-icon="email"
          />

          <q-input
            v-model="form.github"
            label="GitHub"
            filled
            dense
            prefix-icon="code"
            placeholder="https://github.com/kullaniciadi"
          />

          <q-input
            v-model="form.linkedin"
            label="LinkedIn"
            filled
            dense
            prefix-icon="business"
            placeholder="https://linkedin.com/in/kullaniciadi"
          />

          <q-input
            v-model="form.coverLetter"
            label="Ön Yazı"
            filled
            dense
            type="textarea"
            autogrow
            counter
            maxlength="500"
            prefix-icon="edit"
            hint="Kendinizi ve başvuru nedeninizi kısaca açıklayın. (Max: 500 karakter)"
          />

          <q-btn
            label="🚀 Başvuruyu Gönder"
            color="primary"
            class="q-mt-lg submit-btn"
            type="submit"
            unelevated
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Başvuru ID'sini route'dan alıyoruz
const route = useRoute();
const router = useRouter();
const internshipId = route.params.id;

// Form verileri
const form = ref({
  name: "",
  school: "",
  department: "",
  gpa: null,
  experience: null,
  duration: null,
  phone: "",
  email: "",
  github: "",
  linkedin: "",
  coverLetter: "",
});

// Başvuru gönderme işlemi
const submitApplication = () => {
  const applicationData = {
    internshipId: internshipId,
    ...form.value,
  };

  console.log("Başvuru Verileri:", applicationData);

  router.push("/");
  $q.notify({
    type: "positive",
    message: "🎉 Başvurunuz başarıyla gönderildi!",
    timeout: 3000,
  });
};
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #e3f2fd 0%, #fff 100%);
  min-height: 100vh;
}

.form-card {
  max-width: 700px;
  margin: 40px auto;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

.text-primary {
  font-size: 2rem;
  font-weight: bold;
}

.form-subtitle {
  font-size: 1rem;
  color: #555;
}

.q-input,
.q-select {
  border-radius: 10px;
  background-color: #f9f9f9;
}

.q-input__inner,
.q-select__inner {
  border: 1px solid #dcdfe4;
}

.q-input__inner:hover,
.q-select__inner:hover {
  border-color: #1976d2;
}

.submit-btn {
  width: 100%;
  padding: 12px 0;
  font-size: 1.2rem;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.submit-btn:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
