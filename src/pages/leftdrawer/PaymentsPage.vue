<template>
  <q-page class="payments-page q-pa-md">
    <!-- Başlık Bölümü -->
    <div class="header-section q-mb-lg">
      <h2 class="text-h4 text-weight-bold q-mb-sm">Staj Ödemeleri</h2>
      <p class="text-subtitle1 text-grey-7">
        Staj ödemelerinizi takip edebilir ve geçmiş ödemelerinizi
        görüntüleyebilirsiniz.
      </p>
    </div>

    <!-- Özet Kartları -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4">
        <q-card class="summary-card">
          <q-card-section>
            <div class="row items-center">
              <div class="col-auto">
                <q-icon name="payments" size="3rem" class="text-primary" />
              </div>
              <div class="col q-ml-md">
                <div class="text-h6">Toplam Ödeme</div>
                <div class="text-h4 text-weight-bold text-primary">₺4,500</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="summary-card">
          <q-card-section>
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="calendar_today"
                  size="3rem"
                  class="text-secondary"
                />
              </div>
              <div class="col q-ml-md">
                <div class="text-h6">Toplam Gün</div>
                <div class="text-h4 text-weight-bold text-secondary">45</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="summary-card">
          <q-card-section>
            <div class="row items-center">
              <div class="col-auto">
                <q-icon name="trending_up" size="3rem" class="text-positive" />
              </div>
              <div class="col q-ml-md">
                <div class="text-h6">Günlük Ücret</div>
                <div class="text-h4 text-weight-bold text-positive">₺100</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Filtreler -->
    <div class="filters-section q-mb-lg">
      <div class="row q-col-gutter-md items-center">
        <div class="col-12 col-md-4">
          <q-input
            outlined
            v-model="search"
            label="Ödeme Ara"
            dense
            class="search-input"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-4">
          <q-select
            outlined
            v-model="selectedMonth"
            :options="months"
            label="Ay Seçin"
            dense
            class="month-select"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-btn-group spread>
            <q-btn
              label="Tümü"
              :color="filter === 'all' ? 'primary' : 'grey-3'"
              :text-color="filter === 'all' ? 'white' : 'black'"
              @click="filter = 'all'"
            />
            <q-btn
              label="Ödenenler"
              :color="filter === 'paid' ? 'positive' : 'grey-3'"
              :text-color="filter === 'paid' ? 'white' : 'black'"
              @click="filter = 'paid'"
            />
            <q-btn
              label="Bekleyenler"
              :color="filter === 'pending' ? 'warning' : 'grey-3'"
              :text-color="filter === 'pending' ? 'white' : 'black'"
              @click="filter = 'pending'"
            />
          </q-btn-group>
        </div>
      </div>
    </div>

    <!-- Ödeme Tablosu -->
    <q-card flat bordered class="payment-table-card">
      <q-table
        :rows="payments"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="loading"
        class="payments-table"
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
          <q-td :props="props">
            <q-btn
              flat
              round
              color="primary"
              icon="visibility"
              size="sm"
              @click="viewPaymentDetails(props.row)"
            >
              <q-tooltip>Detayları Görüntüle</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              color="secondary"
              icon="file_download"
              size="sm"
              @click="downloadReceipt(props.row)"
            >
              <q-tooltip>Makbuzu İndir</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
const selectedMonth = ref(null);
const filter = ref("all");
const loading = ref(false);

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const columns = [
  {
    name: "period",
    label: "Dönem",
    field: "period",
    align: "left",
    sortable: true,
  },
  {
    name: "startDate",
    label: "Başlangıç",
    field: "startDate",
    align: "left",
    sortable: true,
  },
  {
    name: "endDate",
    label: "Bitiş",
    field: "endDate",
    align: "left",
    sortable: true,
  },
  {
    name: "days",
    label: "Gün",
    field: "days",
    align: "center",
    sortable: true,
  },
  {
    name: "amount",
    label: "Tutar",
    field: "amount",
    align: "right",
    sortable: true,
  },
  {
    name: "status",
    label: "Durum",
    field: "status",
    align: "center",
    sortable: true,
  },
  {
    name: "actions",
    label: "İşlemler",
    field: "actions",
    align: "center",
  },
];

const payments = [
  {
    id: 1,
    period: "2024 Bahar",
    startDate: "01.02.2024",
    endDate: "01.03.2024",
    days: 20,
    amount: "₺2,000",
    status: "Ödendi",
  },
  {
    id: 2,
    period: "2024 Yaz",
    startDate: "01.07.2024",
    endDate: "01.08.2024",
    days: 25,
    amount: "₺2,500",
    status: "Beklemede",
  },
];

const pagination = ref({
  sortBy: "period",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const getStatusColor = (status) => {
  switch (status) {
    case "Ödendi":
      return "positive";
    case "Beklemede":
      return "warning";
    default:
      return "grey";
  }
};

const viewPaymentDetails = (payment) => {
  // Ödeme detayları görüntüleme fonksiyonu
  console.log("Ödeme detayları:", payment);
};

const downloadReceipt = (payment) => {
  // Makbuz indirme fonksiyonu
  console.log("Makbuz indiriliyor:", payment);
};
</script>

<style lang="scss">
.payments-page {
  .header-section {
    background: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
    padding: 2rem;
    border-radius: 8px;
    color: white;
    margin-bottom: 2rem;
  }

  .summary-card {
    transition: transform 0.2s;
    border-radius: 8px;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .payment-table-card {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .payments-table {
    .q-table__card {
      border-radius: 8px;
    }

    thead tr th {
      font-weight: bold;
      background-color: #f5f5f5;
    }

    tbody tr:hover {
      background-color: #f8f9fa;
    }
  }

  .filters-section {
    .search-input,
    .month-select {
      .q-field__control {
        border-radius: 8px;
      }
    }
  }

  .q-btn-group {
    border-radius: 8px;
    overflow: hidden;

    .q-btn {
      padding: 8px 16px;
    }
  }

  .q-chip {
    font-weight: 500;
  }
}
</style>
