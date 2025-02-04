<template>
  <q-page padding>
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Öğrenci / Derslerim</div>
      </q-card-section>

      <!-- Dönem Seçimi -->
      <q-tabs v-model="selectedTerm" dense class="bg-grey-3 text-dark">
        <q-tab name="2024-2025" label="2024 - 2025 (4. Sınıf)" />
        <q-tab name="2023-2024" label="2023 - 2024 (3. Sınıf)" />
        <q-tab name="2022-2023" label="2022 - 2023 (2. Sınıf)" />
        <q-tab name="2021-2022" label="2021 - 2022 (1. Sınıf)" />
      </q-tabs>

      <!-- Arama Kutusu -->
      <q-card-section>
        <q-input
          v-model="searchQuery"
          placeholder="Ara..."
          outlined
          dense
          debounce="300"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>

      <!-- Dersler Tablosu -->
      <q-table
        :rows="filteredCourses"
        :columns="columns"
        row-key="code"
        dense
        separator="cell"
        class="custom-table"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat dense icon="settings" color="grey" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    // Seçili dönem
    const selectedTerm = ref("2024-2025");

    // Arama sorgusu
    const searchQuery = ref("");

    // Ders listesi (JSON olarak)
    const courses = ref([
      {
        term: "2024-2025",
        type: "Zorunlu",
        code: "YBS4112976",
        name: "GİRİŞİMCİLİK, İŞ MODELİ VE İNOVASYON",
        akts: 4,
        credit: 3,
        language: "Türkçe",
        status: "Geçti",
        average: "90,00",
        grade: "A- | 3,59",
      },
      {
        term: "2024-2025",
        type: "Zorunlu",
        code: "YBS4180233",
        name: "YÖNETİM BİLİŞİM SİSTEMLERİ GELİŞTİRME PROJESİ - I",
        akts: 7,
        credit: 5,
        language: "Türkçe",
        status: "Geçti",
        average: "91,00",
        grade: "A- | 3,63",
      },
      {
        term: "2024-2025",
        type: "Zorunlu",
        code: "YBS2111660",
        name: "MESLEKİ İNGİLİZCE I",
        akts: 4,
        credit: 4,
        language: "İngilizce",
        status: "Geçti",
        average: "64,00",
        grade: "C- | 2,47",
      },
      {
        term: "2024-2025",
        type: "Programa Bağlı Seçmeli",
        code: "YBS4120084",
        name: "YAZ STAJI",
        akts: 9,
        credit: 1,
        language: "Türkçe",
        status: "Geçti",
        average: "90,00",
        grade: "A- | 3,59",
      },
      {
        term: "2024-2025",
        type: "Programa Bağlı Seçmeli",
        code: "YBS3120072",
        name: "TÜRKİYE EKONOMİSİ",
        akts: 4,
        credit: 2,
        language: "Türkçe",
        status: "Geçti",
        average: "90,00",
        grade: "A- | 3,59",
      },
    ]);

    // Tablonun sütunları
    const columns = [
      {
        name: "type",
        required: true,
        label: "Türü",
        align: "left",
        field: "type",
        sortable: true,
      },
      {
        name: "code",
        label: "Kodu",
        align: "left",
        field: "code",
        sortable: true,
      },
      {
        name: "name",
        label: "Adı",
        align: "left",
        field: "name",
        sortable: true,
      },
      {
        name: "akts",
        label: "AKTS",
        align: "center",
        field: "akts",
        sortable: true,
      },
      {
        name: "credit",
        label: "Kredi",
        align: "center",
        field: "credit",
        sortable: true,
      },
      {
        name: "language",
        label: "Dili",
        align: "center",
        field: "language",
        sortable: true,
      },
      {
        name: "status",
        label: "Durumu",
        align: "center",
        field: "status",
        sortable: true,
      },
      {
        name: "average",
        label: "Ortalaması",
        align: "center",
        field: "average",
        sortable: true,
      },
      {
        name: "grade",
        label: "Başarı Katsayısı",
        align: "center",
        field: "grade",
        sortable: true,
      },
      { name: "actions", label: "İşlemler", align: "center" },
    ];

    // Seçili döneme göre filtreleme
    const filteredCourses = computed(() => {
      return courses.value.filter(
        (course) =>
          course.term === selectedTerm.value &&
          (searchQuery.value === "" ||
            course.name
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.value.toLowerCase()))
      );
    });

    return {
      selectedTerm,
      searchQuery,
      courses,
      columns,
      filteredCourses,
    };
  },
};
</script>

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f5f7fa;
  padding: 20px;
}

.q-card {
  width: 100%;
  max-width: 1200px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.q-card-section.bg-primary {
  background-color: #1976d2;
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 16px;
}

.q-tabs {
  margin-bottom: 10px;
}

.q-input {
  width: 300px;
  margin-bottom: 10px;
}

.custom-table {
  margin-top: 10px;
}

.q-btn {
  border-radius: 5px;
}
</style>
