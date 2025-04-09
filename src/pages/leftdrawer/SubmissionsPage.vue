<template>
  <q-page class="submissions-page">
    <!-- Üst Banner -->
    <q-parallax
      :height="200"
      :speed="0.5"
      src="https://cdn.quasar.dev/img/parallax2.jpg"
    >
      <div class="absolute-center text-center">
        <h2 class="text-h3 text-white q-mb-md">Staj Başvurularım</h2>
        <q-breadcrumbs class="text-white">
          <q-breadcrumbs-el label="Ana Sayfa" icon="home" />
          <q-breadcrumbs-el label="Başvurularım" icon="folder" />
        </q-breadcrumbs>
      </div>
    </q-parallax>

    <div class="q-pa-md">
      <!-- İstatistik Kartları -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="stats-card cursor-pointer" flat bordered>
            <q-card-section class="bg-primary text-white">
              <div class="text-subtitle2">Toplam Başvuru</div>
              <div class="text-h4">12</div>
              <q-circular-progress
                class="absolute-bottom-right q-ma-sm"
                show-value
                size="50px"
                :value="75"
                color="white"
                track-color="primary-7"
              />
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="stats-card cursor-pointer" flat bordered>
            <q-card-section class="bg-positive text-white">
              <div class="text-subtitle2">Onaylanan</div>
              <div class="text-h4">8</div>
              <q-circular-progress
                class="absolute-bottom-right q-ma-sm"
                show-value
                size="50px"
                :value="66"
                color="white"
                track-color="positive-7"
              />
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="stats-card cursor-pointer" flat bordered>
            <q-card-section class="bg-warning text-white">
              <div class="text-subtitle2">Bekleyen</div>
              <div class="text-h4">3</div>
              <q-circular-progress
                class="absolute-bottom-right q-ma-sm"
                show-value
                size="50px"
                :value="25"
                color="white"
                track-color="warning-7"
              />
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="stats-card cursor-pointer" flat bordered>
            <q-card-section class="bg-negative text-white">
              <div class="text-subtitle2">Reddedilen</div>
              <div class="text-h4">1</div>
              <q-circular-progress
                class="absolute-bottom-right q-ma-sm"
                show-value
                size="50px"
                :value="8"
                color="white"
                track-color="negative-7"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Filtreler ve Arama -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input
                v-model="search"
                dense
                outlined
                label="Başvuru Ara"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-4">
              <q-select
                v-model="statusFilter"
                :options="statusOptions"
                dense
                outlined
                label="Durum Filtrele"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="filter_list" />
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-4">
              <q-btn-toggle
                v-model="viewMode"
                spread
                no-caps
                rounded
                unelevated
                toggle-color="primary"
                color="grey-3"
                text-color="grey-8"
                class="full-width"
                :options="[
                  { label: 'Kart Görünümü', value: 'card', icon: 'grid_view' },
                  { label: 'Liste Görünümü', value: 'list', icon: 'list' },
                ]"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Başvuru Listesi -->
      <div v-if="viewMode === 'card'">
        <div class="row q-col-gutter-md">
          <div
            v-for="submission in submissions"
            :key="submission.id"
            class="col-12 col-md-6"
          >
            <q-card class="submission-card">
              <q-card-section>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6">{{ submission.company }}</div>
                    <div class="text-subtitle2">{{ submission.position }}</div>
                  </div>
                  <div class="col-auto">
                    <q-chip
                      :color="getStatusColor(submission.status)"
                      text-color="white"
                      size="md"
                    >
                      {{ submission.status }}
                    </q-chip>
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="event" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Başvuru Tarihi</q-item-label>
                      <q-item-label caption>{{ submission.date }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="schedule" color="secondary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Staj Dönemi</q-item-label>
                      <q-item-label caption
                        >{{ submission.startDate }} -
                        {{ submission.endDate }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn flat round color="grey" icon="more_vert">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section avatar>
                          <q-icon name="visibility" />
                        </q-item-section>
                        <q-item-section>Detaylar</q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup>
                        <q-item-section avatar>
                          <q-icon name="edit" />
                        </q-item-section>
                        <q-item-section>Düzenle</q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item clickable v-close-popup>
                        <q-item-section avatar>
                          <q-icon name="delete" color="negative" />
                        </q-item-section>
                        <q-item-section class="text-negative"
                          >Sil</q-item-section
                        >
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <div v-else>
        <q-table
          :rows="submissions"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="{ rowsPerPage: 10 }"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip
                :color="getStatusColor(props.value)"
                text-color="white"
                size="sm"
              >
                {{ props.value }}
              </q-chip>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-sm">
              <q-btn flat round color="primary" icon="visibility" size="sm">
                <q-tooltip>Detaylar</q-tooltip>
              </q-btn>
              <q-btn flat round color="secondary" icon="edit" size="sm">
                <q-tooltip>Düzenle</q-tooltip>
              </q-btn>
              <q-btn flat round color="negative" icon="delete" size="sm">
                <q-tooltip>Sil</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <!-- Yeni Başvuru FAB -->
    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn fab icon="add" color="primary" @click="openNewSubmissionDialog">
        <q-tooltip>Yeni Başvuru</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
const statusFilter = ref(null);
const viewMode = ref("card");

const statusOptions = ["Tümü", "Onaylandı", "Beklemede", "Reddedildi"];

const columns = [
  {
    name: "company",
    required: true,
    label: "Şirket",
    align: "left",
    field: (row) => row.company,
    sortable: true,
  },
  {
    name: "position",
    required: true,
    label: "Pozisyon",
    align: "left",
    field: (row) => row.position,
    sortable: true,
  },
  {
    name: "date",
    label: "Başvuru Tarihi",
    align: "left",
    field: (row) => row.date,
    sortable: true,
  },
  {
    name: "startDate",
    label: "Başlangıç",
    align: "left",
    field: (row) => row.startDate,
  },
  {
    name: "endDate",
    label: "Bitiş",
    align: "left",
    field: (row) => row.endDate,
  },
  {
    name: "status",
    label: "Durum",
    align: "center",
    field: (row) => row.status,
  },
  {
    name: "actions",
    label: "İşlemler",
    align: "center",
  },
];

const submissions = [
  {
    id: 1,
    company: "Tech A.Ş.",
    position: "Yazılım Stajyeri",
    status: "Onaylandı",
    date: "01.03.2024",
    startDate: "01.07.2024",
    endDate: "31.08.2024",
  },
  {
    id: 2,
    company: "İnovasyon Ltd.",
    position: "Backend Stajyeri",
    status: "Beklemede",
    date: "05.03.2024",
    startDate: "01.07.2024",
    endDate: "31.07.2024",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Onaylandı":
      return "positive";
    case "Beklemede":
      return "warning";
    case "Reddedildi":
      return "negative";
    default:
      return "grey";
  }
};

const openNewSubmissionDialog = () => {
  // Yeni başvuru dialog fonksiyonu
};
</script>

<style lang="scss">
.submissions-page {
  .stats-card {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .q-card__section {
      padding: 20px;
      position: relative;
      min-height: 120px;
    }
  }

  .submission-card {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .q-table__card {
    border-radius: 8px;
    box-shadow: none;
  }

  .q-btn-toggle {
    border-radius: 8px;
  }

  .q-chip {
    font-weight: 500;
  }

  // Responsive düzenlemeler
  @media (max-width: 600px) {
    .q-parallax {
      height: 150px !important;
    }

    .text-h3 {
      font-size: 2rem;
    }
  }
}
</style>
