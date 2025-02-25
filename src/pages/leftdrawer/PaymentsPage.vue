<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h5">Staj Ödeme Takip Sistemi</div>
        <div class="text-subtitle2">
          Ödeme detaylarını bu sayfadan takip edebilirsiniz.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-table
          :rows="payments"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :pagination="{ rowsPerPage: 5 }"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                color="primary"
                flat
                label="Detaylar"
                @click="showDetails(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Ödeme Detayları Modalı -->
    <q-dialog v-model="paymentDetailDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Ödeme Detayları</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div><b>Öğrenci Adı:</b> {{ selectedPayment.studentName }}</div>
          <div><b>Ödeme Tutarı:</b> {{ selectedPayment.amount }} TL</div>
          <div><b>Durum:</b> {{ selectedPayment.status }}</div>
          <div><b>Ödeme Tarihi:</b> {{ selectedPayment.date }}</div>
          <div><b>Açıklama:</b> {{ selectedPayment.description }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Kapat" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// Ödeme tablosu kolonları
const columns = [
  {
    name: "studentName",
    label: "Öğrenci Adı",
    field: "studentName",
    align: "left",
  },
  {
    name: "amount",
    label: "Tutar (TL)",
    field: "amount",
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Durum",
    field: "status",
    align: "left",
    sortable: true,
  },
  { name: "date", label: "Ödeme Tarihi", field: "date", align: "left" },
  { name: "actions", label: "İşlemler", field: "actions", align: "center" },
];

// Ödeme verileri
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

// Detay modalı için reaktif veriler
const paymentDetailDialog = ref(false);
const selectedPayment = ref({});

// Ödeme detaylarını gösterme
const showDetails = (payment) => {
  selectedPayment.value = payment;
  paymentDetailDialog.value = true;
};
</script>

<style scoped>
.q-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.q-card {
  width: 100%;
  max-width: 800px;
}
</style>
