<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Staj Başvuruları</div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="applications"
          :columns="columns"
          row-key="id"
          dense
          bordered
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip
                :color="getStatusColor(props.row.status)"
                text-color="white"
              >
                {{ props.row.status }}
              </q-chip>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                icon="edit"
                @click="editApplication(props.row)"
                color="blue"
              />
              <q-btn
                flat
                icon="delete"
                @click="deleteApplication(props.row.id)"
                color="red"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <q-card-section>
        <q-btn
          label="Yeni Başvuru"
          color="primary"
          @click="showAddDialog = true"
        />
      </q-card-section>
    </q-card>

    <!-- Başvuru Ekleme ve Güncelleme Dialogu -->
    <q-dialog v-model="showAddDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ isEdit ? "Başvuruyu Güncelle" : "Yeni Başvuru" }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.company" label="Şirket Adı" outlined />
          <q-input v-model="form.position" label="Pozisyon" outlined />
          <q-select
            v-model="form.status"
            :options="statusOptions"
            label="Durum"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="İptal" color="negative" v-close-popup />
          <q-btn flat label="Kaydet" color="primary" @click="saveApplication" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const applications = ref([
      {
        id: 1,
        company: "ABC Ltd.",
        position: "Yazılım Geliştirici",
        status: "Beklemede",
      },
      {
        id: 2,
        company: "XYZ A.Ş.",
        position: "Frontend Developer",
        status: "Onaylandı",
      },
    ]);

    const columns = [
      { name: "company", label: "Şirket", align: "left", field: "company" },
      { name: "position", label: "Pozisyon", align: "left", field: "position" },
      { name: "status", label: "Durum", align: "left", field: "status" },
      { name: "actions", label: "İşlemler", align: "center", field: "actions" },
    ];

    const statusOptions = ["Beklemede", "Onaylandı", "Reddedildi"];
    const showAddDialog = ref(false);
    const isEdit = ref(false);
    const form = ref({
      id: null,
      company: "",
      position: "",
      status: "Beklemede",
    });

    const getStatusColor = (status) => {
      return status === "Onaylandı"
        ? "green"
        : status === "Reddedildi"
        ? "red"
        : "orange";
    };

    const saveApplication = () => {
      if (isEdit.value) {
        // Güncelleme işlemi
        const index = applications.value.findIndex(
          (a) => a.id === form.value.id
        );
        if (index !== -1) {
          applications.value[index] = { ...form.value };
        }
      } else {
        // Yeni ekleme işlemi
        const newApp = { ...form.value, id: applications.value.length + 1 };
        applications.value.push(newApp);
      }
      showAddDialog.value = false;
      resetForm();
    };

    const editApplication = (app) => {
      form.value = { ...app };
      isEdit.value = true;
      showAddDialog.value = true;
    };

    const deleteApplication = (id) => {
      applications.value = applications.value.filter((app) => app.id !== id);
    };

    const resetForm = () => {
      form.value = { id: null, company: "", position: "", status: "Beklemede" };
      isEdit.value = false;
    };

    return {
      applications,
      columns,
      statusOptions,
      showAddDialog,
      form,
      isEdit,
      getStatusColor,
      saveApplication,
      editApplication,
      deleteApplication,
    };
  },
};
</script>

<style scoped>
.q-table {
  margin-top: 10px;
}
</style>
