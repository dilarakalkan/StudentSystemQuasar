<template>
  <q-page class="q-pa-md bg-gradient">
    <q-card class="q-pa-lg payment-card">
      <q-card-section>
        <div class="text-center">
          <h2 class="text-primary q-mb-sm">💳 Staj Ödeme Takip Sistemi</h2>
          <p class="form-subtitle">
            Ödeme süreçlerinizi kolayca takip edin ve detaylara göz atın.
          </p>
        </div>
      </q-card-section>

      <q-separator color="primary" />

      <q-card-section>
        <q-table
          :rows="payments"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="{ rowsPerPage: 5 }"
          class="styled-table"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge
                :color="getStatusColor(props.row.status)"
                align="middle"
                class="q-pa-xs text-white q-mb-xs"
                style="font-size: 0.8rem"
              >
                {{ props.row.status }}
              </q-badge>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                color="primary"
                flat
                icon="visibility"
                label="Detaylar"
                @click="showDetails(props.row)"
                style="font-size: 0.85rem; padding: 4px 8px"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Ödeme Detayları Modalı -->
    <q-dialog v-model="paymentDetailDialog" persistent>
      <q-card class="detail-modal">
        <q-card-section class="row items-center q-pb-none">
          <q-icon name="credit_card" size="30px" color="primary" />
          <div class="text-h6 q-ml-sm" style="font-size: 1rem">
            💡 Ödeme Detayları
          </div>
        </q-card-section>

        <q-separator color="primary" />

        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section avatar><q-icon name="person" /></q-item-section>
              <q-item-section>
                <q-item-label
                  ><b>Öğrenci Adı:</b>
                  {{ selectedPayment.studentName }}</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar><q-icon name="payments" /></q-item-section>
              <q-item-section>
                <q-item-label
                  ><b>Ödeme Tutarı:</b>
                  {{ selectedPayment.amount }} TL</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar><q-icon name="event" /></q-item-section>
              <q-item-section>
                <q-item-label
                  ><b>Ödeme Tarihi:</b> {{ selectedPayment.date }}</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar><q-icon name="info" /></q-item-section>
              <q-item-section>
                <q-item-label
                  ><b>Durum:</b> {{ selectedPayment.status }}</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar
                ><q-icon name="description"
              /></q-item-section>
              <q-item-section>
                <q-item-label
                  ><b>Açıklama:</b>
                  {{ selectedPayment.description }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Kapat"
            color="primary"
            v-close-popup
            style="font-size: 0.85rem; padding: 6px 12px"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const columns = [
  {
    name: "studentName",
    label: "👩‍🎓 Öğrenci Adı",
    field: "studentName",
    align: "left",
  },
  {
    name: "amount",
    label: "💰 Tutar (TL)",
    field: "amount",
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "📌 Durum",
    field: "status",
    align: "left",
    sortable: true,
  },
  { name: "date", label: "📅 Ödeme Tarihi", field: "date", align: "left" },
  { name: "actions", label: "⚡ İşlemler", field: "actions", align: "center" },
];

const payments = ref([
  {
    id: 1,
    studentName: "Dilara Kalkan",
    amount: 4500,
    status: "Beklemede",
    date: "2025-03-15",
    description: "Staj süreci tamamlandıktan sonra ödenecektir.",
  },
]);

const getStatusColor = (status) => {
  return status === "Ödendi"
    ? "green"
    : status === "Beklemede"
    ? "orange"
    : "red";
};

const paymentDetailDialog = ref(false);
const selectedPayment = ref({});

const showDetails = (payment) => {
  selectedPayment.value = payment;
  paymentDetailDialog.value = true;
};
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-card {
  width: 100%;
  max-width: 900px;
  margin: auto;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.text-primary {
  font-size: 2rem;
  font-weight: bold;
  color: #1976d2;
}

.form-subtitle {
  font-size: 1rem;
  color: #555;
}

.styled-table {
  border-radius: 15px;
  overflow: hidden;
}

.q-table th,
.q-table td {
  text-align: center;
  padding: 12px;
}

.q-badge {
  border-radius: 10px;
  font-weight: bold;
  font-size: 0.85rem;
  padding: 4px 8px;
}

.detail-modal {
  border-radius: 20px;
  min-width: 400px;
  padding: 16px;
}

.q-dialog__inner--minimized > div {
  width: 90%;
}

@media (max-width: 768px) {
  .payment-card {
    padding: 16px;
    max-width: 100%;
  }

  .text-primary {
    font-size: 1.8rem;
  }

  .detail-modal {
    min-width: 100%;
  }
}
</style>
