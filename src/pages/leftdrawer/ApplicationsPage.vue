<template>
  <q-page>
    <div class="q-pa-md bg-light shadow-1 rounded my-div">
      <!-- Arama Kutusu -->
      <q-input
        v-model="searchQuery"
        filled
        label="Aranan Kelime"
        class="q-mr-md search-input"
        placeholder="Arama yapın"
      ></q-input>

      <q-select
        v-model="sortOrder"
        :options="sortOptions"
        filled
        label="Sıralama"
        class="q-mr-md sort-select"
      />

      <!-- Ara Butonu -->
      <q-btn
        label="Ara"
        color="primary"
        class="search-btn"
        @click="onSearch"
        unelevated
      />
    </div>

    <!-- Staj İlanları Listesi -->
    <div class="q-pa-md">
      <q-card
        v-for="internship in filteredInternships"
        :key="internship.id"
        class="q-mb-md"
      >
        <q-card-section>
          <h3>{{ internship.title }}</h3>
          <p><strong>Şirket:</strong> {{ internship.company }}</p>
          <p><strong>Şehir:</strong> {{ internship.city }}</p>
          <p><strong>Alan:</strong> {{ internship.field }}</p>
          <p>
            <strong>Başvuru Tarihi:</strong> {{ internship.application_date }}
          </p>
          <q-btn
            label="Başvur"
            color="green"
            @click="applyToInternship(internship)"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";

// Staj İlanları Verisi
const internships = ref([
  {
    id: 1,
    title: "Yazılım Geliştirme",
    company: "Teknokent",
    city: "Ankara",
    field: "Bilgisayar Mühendisliği",
    application_date: "2025-01-01",
  },
  {
    id: 2,
    title: "Yazılım Geliştirme",
    company: "Teknokent",
    city: "Ankara",
    field: "Bilgisayar Mühendisliği",
    application_date: "2025-01-01",
  },
  {
    id: 3,
    title: "Endüstri Stajı",
    company: "Bilkent",
    city: "Ankara",
    field: "Endüstri Mühendisliği",
    application_date: "2025-05-10",
  },
  {
    id: 4,
    title: "Pazarlama Stajı",
    company: "BTK",
    city: "İstanbul",
    field: "Pazarlama",
    application_date: "2025-03-16",
  },
]);

// Form verileri
const searchQuery = ref("");
const sortOrder = ref("");

// Sıralama seçenekleri
const sortOptions = [
  { label: "Başvuru Tarihi", value: "application_date" },
  { label: "Staj Alanı", value: "field" },
  { label: "İl", value: "city" },
  { label: "Şirket Adı", value: "company" },
];

// Arama ve sıralama işlevselliği
const filteredInternships = computed(() => {
  let result = internships.value;

  // Arama filtresi
  if (searchQuery.value) {
    result = result.filter((internship) =>
      internship.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Sıralama
  if (sortOrder.value) {
    result = result.sort((a, b) => {
      if (sortOrder.value === "application_date") {
        return new Date(a.application_date) - new Date(b.application_date);
      } else {
        return a[sortOrder.value].localeCompare(b[sortOrder.value]);
      }
    });
  }

  return result;
});

// Ara butonuna tıklamaaaaaa
const onSearch = () => {
  console.log("Arama yapıldı:", searchQuery.value);
};
</script>

<style scoped>
/* Staj İlanları */
.q-pa-md {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 10px;
}

/* Staj Kartları */
.q-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
  padding: 15px;
  text-align: left;
  height: auto;
}
.q-card:hover {
  transform: translateY(-5px); /* Hover sırasında kart yukarı kalkar */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.q-card-section h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: aqua;
  margin-bottom: 10px;
}
.q-card-section p {
  margin: 5px 0;
  fonts-size: 0.9rem;
  line-height: 1.4;
}
@media (max-width: 600px) {
  .q-pa-md {
    grid-template-columns: 1fr;
  }
}
</style>
