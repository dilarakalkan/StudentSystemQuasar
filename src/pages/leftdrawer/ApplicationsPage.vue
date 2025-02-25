<template>
  <q-page class="q-pa-md">
    <!-- Arama ve Filtreleme Bölümü -->
    <div class="search-filter-container shadow-2 rounded-borders q-pa-md">
      <q-input
        v-model="searchQuery"
        filled
        label="Aranan Kelime"
        class="q-mr-md search-input"
        placeholder="Başlık veya Şirket Ara..."
        dense
      />

      <q-select
        v-model="selectedField"
        :options="fieldOptions"
        filled
        label="Alan"
        class="q-mr-md"
        dense
        clearable
      />

      <q-select
        v-model="selectedCity"
        :options="cityOptions"
        filled
        label="Şehir"
        class="q-mr-md"
        dense
        clearable
      />

      <q-btn label="Ara" color="primary" unelevated @click="onSearch" />
    </div>

    <!-- Staj İlanları Listesi -->
    <div class="q-pa-md internship-list">
      <q-card
        v-for="internship in filteredInternships"
        :key="internship.id"
        class="internship-card q-mb-md"
      >
        <q-card-section>
          <h3 class="text-primary">{{ internship.field }} Stajyeri</h3>
          <p><strong>Şirket:</strong> {{ internship.company }}</p>
          <p><strong>Şehir:</strong> {{ internship.city }}</p>
          <p><strong>Alan:</strong> {{ internship.field }}</p>
          <p>
            <strong>Başvuru Tarihi:</strong> {{ internship.application_date }}
          </p>
          <q-btn
            label="Başvur"
            color="green"
            unelevated
            @click="applyToInternship(internship)"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";

// 100 farklı staj ilanı
const internships = ref([]);
const fields = [
  "Bilgisayar Mühendisliği",
  "Yapay Zeka",
  "Endüstri Mühendisliği",
  "Pazarlama",
  "İş Analizi",
  "Siber Güvenlik",
  "Elektrik Mühendisliği",
  "Makine Mühendisliği",
  "Hukuk",
  "Finans",
  "Grafik Tasarım",
  "İç Mimarlık",
  "İnsan Kaynakları",
  "Sağlık Yönetimi",
  "Biyomedikal Mühendisliği",
];
const cities = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Kocaeli",
  "Eskişehir",
  "Konya",
  "Gaziantep",
  "Antalya",
];
const companies = [
  "Microsoft",
  "Amazon",
  "Turkcell",
  "Siemens",
  "TUSAŞ",
  "Hepsiburada",
  "Arçelik",
  "Google",
  "Huawei",
  "Aselsan",
  "Vestel",
  "Ford Otosan",
  "Türk Telekom",
  "Akbank",
  "P&G",
];

// 100 farklı ilan oluştur
for (let i = 1; i <= 100; i++) {
  internships.value.push({
    id: i,
    title: `${fields[i % fields.length]} Stajı`,
    company: companies[i % companies.length],
    city: cities[i % cities.length],
    field: fields[i % fields.length],
    application_date: `2025-${(i % 12) + 1}-${(i % 28) + 1}`,
  });
}

// Kullanıcı Girdileri
const searchQuery = ref("");
const selectedField = ref(null);
const selectedCity = ref(null);

// Sıralama ve Filtreleme Seçenekleri
const fieldOptions = fields;
const cityOptions = cities;

// Gelişmiş Filtreleme
const filteredInternships = computed(() => {
  let result = internships.value;

  if (searchQuery.value) {
    result = result.filter(
      (internship) =>
        internship.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        internship.company
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedField.value) {
    result = result.filter(
      (internship) => internship.field === selectedField.value
    );
  }

  if (selectedCity.value) {
    result = result.filter(
      (internship) => internship.city === selectedCity.value
    );
  }

  return result;
});

// Ara Butonu Tıklama Olayı
const onSearch = () => {
  console.log("Arama yapıldı:", searchQuery.value);
};

// Başvuru Fonksiyonu
const applyToInternship = (internship) => {
  alert(`${internship.field} alanındaki staj ilanına başvuruldu!`);
};
</script>

<style scoped>
/* Filtreleme Alanı */
.search-filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  background: #f0f4f8; /* Hafif pastel mavi arka plan */
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08); /* Hafif gölge */
}

/* Staj Listesi */
.internship-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Staj Kartları */
.internship-card {
  background-color: #ffffff;
  border: 1px solid #e6e9ed;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.internship-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.internship-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #007bff; /* Modern bir mavi tonu */
  margin-bottom: 10px;
}

.internship-card p {
  font-size: 0.95rem;
  color: #5a5a5a;
  line-height: 1.5;
  margin-bottom: 10px;
}

/* Genel Düğme Stili */
.q-btn {
  border-radius: 8px !important;
  padding: 10px 20px !important;
}

.q-btn.unelevated {
  box-shadow: none !important;
}

.q-btn:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: scale(1.03);
}

/* Tüm Tasarımı Modernleştiren Küçük Detaylar */
.q-input,
.q-select {
  border-radius: 8px !important;
}

.q-input__inner,
.q-select__inner {
  background-color: #f9f9f9 !important;
  border: 1px solid #dcdfe4 !important;
}

.q-input__inner:hover,
.q-select__inner:hover {
  border-color: #007bff !important;
}
</style>
