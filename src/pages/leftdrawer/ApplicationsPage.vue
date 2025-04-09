<template>
  <q-page class="internship-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>Hayalindeki Staja Başvur</h1>
        <p>Binlerce şirket ve yüzlerce staj fırsatı seni bekliyor</p>
        <div class="stats-cards">
          <div class="stat-card">
            <span class="number">500+</span>
            <span class="label">Aktif İlan</span>
          </div>
          <div class="stat-card">
            <span class="number">250+</span>
            <span class="label">Şirket</span>
          </div>
          <div class="stat-card">
            <span class="number">30+</span>
            <span class="label">Şehir</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Arama Bölümü -->
    <div class="search-container">
      <q-card class="search-card">
        <q-card-section class="search-grid">
          <q-input
            v-model="searchText"
            outlined
            placeholder="Pozisyon veya şirket ara"
            class="search-input"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>

          <q-select
            v-model="selectedCity"
            :options="cities"
            outlined
            placeholder="Şehir Seçin"
            class="city-select"
          >
            <template v-slot:prepend>
              <q-icon name="location_on" color="primary" />
            </template>
          </q-select>

          <q-select
            v-model="selectedField"
            :options="fields"
            outlined
            placeholder="Alan Seçin"
            class="field-select"
          >
            <template v-slot:prepend>
              <q-icon name="work" color="primary" />
            </template>
          </q-select>

          <q-btn
            color="primary"
            class="search-btn"
            icon-right="search"
            label="Staj Ara"
            @click="searchInternships"
          />
        </q-card-section>
      </q-card>
    </div>

    <!-- Popüler Alanlar -->
    <div class="popular-fields">
      <h2>Popüler Staj Alanları</h2>
      <div class="fields-grid">
        <q-card
          v-for="field in popularFields"
          :key="field.id"
          class="field-card"
          @click="selectField(field)"
        >
          <q-card-section>
            <q-icon :name="field.icon" size="2rem" color="primary" />
            <h3>{{ field.name }}</h3>
            <p>{{ field.count }} açık pozisyon</p>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Staj İlanları -->
    <div class="internships-section">
      <div class="section-header">
        <h2>Güncel Staj İlanları</h2>
        <div class="filters">
          <q-btn-toggle
            v-model="viewType"
            flat
            spread
            :options="[
              { label: 'Tümü', value: 'all' },
              { label: 'Uzaktan', value: 'remote' },
              { label: 'Yüz Yüze', value: 'onsite' },
            ]"
          />
          <q-select
            v-model="sortBy"
            :options="sortOptions"
            outlined
            dense
            class="sort-select"
          />
        </div>
      </div>

      <div class="internships-grid">
        <q-card
          v-for="internship in internships"
          :key="internship.id"
          class="internship-card"
        >
          <q-card-section horizontal>
            <div class="company-logo">
              <q-avatar size="80px">
                <img
                  :src="internship.logo || 'https://via.placeholder.com/80'"
                />
              </q-avatar>
            </div>

            <q-card-section>
              <div class="internship-header">
                <h3>{{ internship.title }}</h3>
                <q-badge :color="internship.badgeColor">{{
                  internship.type
                }}</q-badge>
              </div>

              <div class="company-details">
                <span class="company-name">
                  <q-icon name="business" size="xs" />
                  {{ internship.company }}
                </span>
                <span class="location">
                  <q-icon name="location_on" size="xs" />
                  {{ internship.location }}
                </span>
              </div>

              <div class="tags">
                <q-chip
                  v-for="tag in internship.tags"
                  :key="tag"
                  size="sm"
                  outline
                >
                  {{ tag }}
                </q-chip>
              </div>

              <div class="internship-footer">
                <div class="details">
                  <span class="deadline">
                    <q-icon name="event" size="xs" />
                    Son başvuru: {{ internship.deadline }}
                  </span>
                  <span class="duration">
                    <q-icon name="schedule" size="xs" />
                    {{ internship.duration }}
                  </span>
                </div>
                <q-btn
                  color="primary"
                  label="Başvur"
                  @click="applyToInternship(internship)"
                  unelevated
                  class="apply-button"
                />
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Arama ve filtreleme state'leri
const searchText = ref("");
const selectedCity = ref(null);
const selectedField = ref(null);
const viewType = ref("all");
const sortBy = ref("newest");

// Mevcut alan ve şehir verileri
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

// Staj türleri
const internshipTypes = ["Tam Zamanlı", "Yarı Zamanlı", "Uzaktan", "Hibrit"];

// Alan başına teknolojiler/yetenekler
const fieldTechnologies = {
  "Bilgisayar Mühendisliği": [
    "Java",
    "Python",
    "C++",
    "Web Development",
    "Cloud Computing",
  ],
  "Yapay Zeka": [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "Deep Learning",
  ],
  "Endüstri Mühendisliği": [
    "SAP",
    "Excel",
    "Süreç Analizi",
    "Optimizasyon",
    "Lean Six Sigma",
  ],
  Pazarlama: [
    "Digital Marketing",
    "SEO",
    "Social Media",
    "Content Creation",
    "Google Analytics",
  ],
  "İş Analizi": ["SQL", "Power BI", "Tableau", "Veri Analizi", "İş Süreçleri"],
  "Siber Güvenlik": [
    "Network Security",
    "Ethical Hacking",
    "SIEM",
    "Penetration Testing",
    "Security+",
  ],
  "Elektrik Mühendisliği": [
    "AutoCAD",
    "PLC",
    "MATLAB",
    "Elektrik Tesisatı",
    "Güç Sistemleri",
  ],
  "Makine Mühendisliği": [
    "SolidWorks",
    "AutoCAD",
    "CATIA",
    "Sonlu Elemanlar Analizi",
    "3D Modelleme",
  ],
  Hukuk: [
    "Hukuk Araştırması",
    "Dava Takibi",
    "Sözleşme İnceleme",
    "Mevzuat Analizi",
  ],
  Finans: [
    "Excel",
    "Financial Modeling",
    "Bloomberg Terminal",
    "Risk Analizi",
    "Muhasebe",
  ],
  "Grafik Tasarım": [
    "Adobe Photoshop",
    "Illustrator",
    "InDesign",
    "UI/UX Design",
    "Typography",
  ],
  "İç Mimarlık": ["AutoCAD", "3Ds Max", "SketchUp", "V-Ray", "Revit"],
  "İnsan Kaynakları": [
    "İK Süreçleri",
    "İşe Alım",
    "Performans Yönetimi",
    "Eğitim Planlama",
  ],
  "Sağlık Yönetimi": [
    "Hastane Bilgi Sistemleri",
    "Sağlık Mevzuatı",
    "Kalite Standartları",
  ],
  "Biyomedikal Mühendisliği": [
    "Medikal Cihaz Tasarımı",
    "Biyomalzemeler",
    "Klinik Mühendislik",
  ],
};

// Zenginleştirilmiş staj ilanları
const internships = ref([]);

// 100 farklı ilan oluştur
for (let i = 1; i <= 100; i++) {
  const field = fields[i % fields.length];
  const workType = internshipTypes[i % internshipTypes.length];
  const technologies = fieldTechnologies[field] || [];

  internships.value.push({
    id: i,
    title: `${field} Stajyeri`,
    company: companies[i % companies.length],
    city: cities[i % cities.length],
    field: field,
    type: workType,
    badgeColor:
      workType === "Uzaktan"
        ? "teal"
        : workType === "Hibrit"
        ? "purple"
        : workType === "Yarı Zamanlı"
        ? "orange"
        : "primary",
    description: `${
      companies[i % companies.length]
    } olarak ${field} alanında deneyimli stajyer aramaktayız.
                 Stajyerimiz projelerimizde aktif rol alacak ve profesyonel ekibimizle birlikte çalışma fırsatı bulacaktır.`,
    requirements: [
      "Üniversite 3. veya 4. sınıf öğrencisi",
      "Min. 2.5 GPA",
      "İyi seviyede İngilizce",
      ...technologies.slice(0, 3),
    ],
    benefits: [
      "Yemek ve Ulaşım Desteği",
      "Eğitim Fırsatları",
      "Network İmkanı",
      "Proje Deneyimi",
    ],
    tags: technologies.slice(0, 3),
    duration: `${(i % 3) + 3} Ay`,
    application_date: `2024-${(i % 12) + 1}-${(i % 28) + 1}`,
    deadline: `2024-${(((i % 12) + 3) % 12) + 1}-${(i % 28) + 1}`,
    logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      companies[i % companies.length]
    )}&background=random`,
  });
}

// Popüler alanları hesapla
const popularFields = computed(() => {
  const fieldCounts = fields.map((field) => ({
    id: fields.indexOf(field),
    name: field,
    icon: getFieldIcon(field),
    count: internships.value.filter((i) => i.field === field).length,
  }));
  return fieldCounts.sort((a, b) => b.count - a.count).slice(0, 6);
});

// Alan ikonlarını belirle
function getFieldIcon(field) {
  const icons = {
    "Bilgisayar Mühendisliği": "computer",
    "Yapay Zeka": "psychology",
    "Endüstri Mühendisliği": "precision_manufacturing",
    Pazarlama: "trending_up",
    "İş Analizi": "analytics",
    "Siber Güvenlik": "security",
    "Elektrik Mühendisliği": "electrical_services",
    "Makine Mühendisliği": "engineering",
    Hukuk: "gavel",
    Finans: "account_balance",
    "Grafik Tasarım": "brush",
    "İç Mimarlık": "architecture",
    "İnsan Kaynakları": "people",
    "Sağlık Yönetimi": "local_hospital",
    "Biyomedikal Mühendisliği": "biotech",
  };
  return icons[field] || "work";
}

// Filtrelenmiş ilanları hesapla
const filteredInternships = computed(() => {
  return internships.value
    .filter((internship) => {
      if (
        viewType.value !== "all" &&
        internship.type.toLowerCase() !== viewType.value
      )
        return false;
      if (selectedCity.value && internship.city !== selectedCity.value)
        return false;
      if (selectedField.value && internship.field !== selectedField.value)
        return false;
      if (searchText.value) {
        const searchLower = searchText.value.toLowerCase();
        return (
          internship.title.toLowerCase().includes(searchLower) ||
          internship.company.toLowerCase().includes(searchLower) ||
          internship.field.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy.value) {
        case "deadline":
          return new Date(a.deadline) - new Date(b.deadline);
        case "company":
          return a.company.localeCompare(b.company);
        default: // newest
          return new Date(b.application_date) - new Date(a.application_date);
      }
    });
});
</script>
<style scoped>
.internship-page {
  background-color: #f8fafc;
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-content p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.stats-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.stat-card .number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-card .label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.search-container {
  max-width: 1200px;
  margin: -2rem auto 0;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.search-card {
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.search-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1.5rem;
}

.popular-fields,
.internships-section {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.field-card {
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e2e8f0;
}

.field-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #4299e1;
}

.field-card h3 {
  margin: 1rem 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.field-card p {
  color: #64748b;
  font-size: 0.9rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.internships-grid {
  display: grid;
  gap: 1.5rem;
}

.internship-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-bottom: 32px;
}

.internship-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #4299e1;
}

.company-logo {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e2e8f0;
}

.internship-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.internship-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #1a202c;
}

.company-details {
  display: flex;
  gap: 1.5rem;
  color: #4a5568;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.company-details span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tags {
  margin: 1rem 0;
}

.internship-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  gap: 32px; /*başvur ile arasına boşluk koyduk*/
}

.details {
  display: flex;
  gap: 1.5rem;
  color: #4a5568;
  font-size: 0.9rem;
}

.details span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* İlanlar arası boşluk */
.row.q-col-gutter-lg {
  margin-top: 32px;
  gap: 32px;
}

/* Başvur butonu için özel stil */
.apply-button {
  margin-left: auto; /* Butonu otomatik olarak sağa iter */
  margin-right: 24px; /* Sağ kenardan boşluk */
}

/* Responsive düzenlemeler */
@media (max-width: 600px) {
  .apply-button {
    margin: 16px 0; /* Mobilde üstten ve alttan boşluk */
    width: 100%; /* Mobilde tam genişlik */
  }

  .search-grid {
    grid-template-columns: 1fr;
  }

  .stats-cards {
    flex-direction: column;
    gap: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
  }

  .filters {
    width: 100%;
    flex-direction: column;
  }

  .company-logo {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }

  .internship-card q-card-section {
    flex-direction: column;
  }

  .internship-footer {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
