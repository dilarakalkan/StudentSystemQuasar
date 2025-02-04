<template>
  <q-page padding>
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Başvuru Takvimi</div>
      </q-card-section>

      <!-- Takvim Bileşeni -->
      <q-card-section>
        <q-calendar
          v-model="currentDate"
          view="month"
          :events="events"
          @click-date="addEvent"
          bordered
        />
      </q-card-section>
    </q-card>

    <!-- Yeni Etkinlik Ekleme Butonu -->
    <div class="q-mt-md text-center">
      <q-btn
        label="Yeni Etkinlik Ekle"
        color="primary"
        @click="showDialog = true"
      />
    </div>

    <!-- Yeni Etkinlik Ekleme / Düzenleme Dialogu -->
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ isEdit ? "Etkinliği Düzenle" : "Yeni Etkinlik" }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newEvent.title" label="Etkinlik Adı" outlined />
          <q-input v-model="newEvent.date" label="Tarih" readonly outlined />
          <q-select
            v-model="newEvent.type"
            :options="eventTypes"
            label="Etkinlik Türü"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="İptal" color="negative" v-close-popup />
          <q-btn flat label="Kaydet" color="primary" @click="saveEvent" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Etkinlik Listesi -->
    <q-card class="q-mt-md">
      <q-card-section class="bg-secondary text-white">
        <div class="text-h6">Eklenen Etkinlikler</div>
      </q-card-section>

      <q-card-section>
        <q-list bordered separator>
          <q-item v-for="(event, index) in events" :key="index">
            <q-item-section>
              <q-item-label>{{ event.title }}</q-item-label>
              <q-item-label caption
                >{{ event.date }} - {{ event.type }}</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-btn flat icon="edit" color="blue" @click="editEvent(index)" />
              <q-btn
                flat
                icon="delete"
                color="red"
                @click="deleteEvent(index)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const currentDate = ref(new Date().toISOString().substring(0, 10));
    const events = ref([
      { title: "Staj Başlangıcı", date: "2025-03-01", type: "staj" },
      { title: "Final Sınavı", date: "2025-03-10", type: "sınav" },
    ]);

    const showDialog = ref(false);
    const isEdit = ref(false);
    const editIndex = ref(null);
    const newEvent = ref({ title: "", date: "", type: "randevu" });
    const eventTypes = ["staj", "sınav", "randevu"];

    const addEvent = (date) => {
      newEvent.value.date = date;
      showDialog.value = true;
      isEdit.value = false;
    };

    const saveEvent = () => {
      if (isEdit.value && editIndex.value !== null) {
        events.value[editIndex.value] = { ...newEvent.value };
      } else {
        events.value.push({ ...newEvent.value });
      }
      resetForm();
    };

    const editEvent = (index) => {
      newEvent.value = { ...events.value[index] };
      editIndex.value = index;
      isEdit.value = true;
      showDialog.value = true;
    };

    const deleteEvent = (index) => {
      events.value.splice(index, 1);
    };

    const resetForm = () => {
      newEvent.value = { title: "", date: "", type: "randevu" };
      isEdit.value = false;
      editIndex.value = null;
      showDialog.value = false;
    };

    return {
      currentDate,
      events,
      showDialog,
      newEvent,
      eventTypes,
      isEdit,
      addEvent,
      saveEvent,
      editEvent,
      deleteEvent,
    };
  },
};
</script>

<style scoped>
/* Sayfa Stili */
.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #f5f7fa; /* Hafif gri arka plan */
  padding: 20px;
}

/* Kart Stili */
.q-card {
  width: 100%;
  max-width: 900px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

/* Başlık Bölümü */
.q-card-section.bg-primary {
  background-color: #1976d2;
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 16px;
}

.q-card-section.bg-secondary {
  background-color: #673ab7;
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 16px;
}

/* Takvim Alanı */
.q-calendar {
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

/* Yeni Etkinlik Ekleme Butonu */
.q-btn {
  margin-top: 10px;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 16px;
}

/* Buton Stilleri */
.q-btn[color="primary"] {
  background-color: #1976d2;
  color: white;
}

.q-btn[color="negative"] {
  background-color: #d32f2f;
  color: white;
}

/* Etkinlik Listesi */
.q-list {
  max-width: 900px;
}

.q-item {
  padding: 10px;
}
</style>
