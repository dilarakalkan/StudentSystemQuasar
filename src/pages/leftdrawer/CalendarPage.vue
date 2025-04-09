<template>
  <q-page class="calendar-page">
    <div class="calendar-container">
      <!-- Quick Filters -->
      <div class="quick-filters">
        <q-btn
          v-for="filter in quickFilters"
          :key="filter.label"
          :label="filter.label"
          flat
          class="filter-btn"
          :class="{ active: filter.active }"
          @click="applyFilter(filter)"
          no-caps
          align="left"
        />
      </div>

      <!-- Calendar Content -->
      <div class="calendar-content">
        <div class="calendar-header">
          <!-- First Month Header -->
          <div class="month-header">
            <q-btn flat dense icon="chevron_left" @click="previousMonth" />
            <span class="month-label">{{ formatMonth(currentDate) }}</span>
            <q-btn flat dense icon="chevron_right" @click="nextMonth" />
          </div>

          <!-- Second Month Header -->
          <div class="month-header">
            <q-btn flat dense icon="chevron_left" @click="previousNextMonth" />
            <span class="month-label">{{ formatMonth(nextMonthDate) }}</span>
            <q-btn flat dense icon="chevron_right" @click="nextNextMonth" />
          </div>
        </div>

        <div class="calendars-wrapper">
          <!-- First Calendar -->
          <div class="calendar">
            <div class="weekdays">
              <span v-for="day in weekDays" :key="day">{{ day }}</span>
            </div>
            <div class="days">
              <button
                v-for="date in firstMonthDays"
                :key="date.value"
                class="day-btn"
                :class="{
                  'other-month': !date.currentMonth,
                  selected: isSelected(date),
                  today: isToday(date),
                }"
                @click="selectDate(date)"
              >
                {{ date.day }}
              </button>
            </div>
          </div>

          <!-- Second Calendar -->
          <div class="calendar">
            <div class="weekdays">
              <span v-for="day in weekDays" :key="day">{{ day }}</span>
            </div>
            <div class="days">
              <button
                v-for="date in secondMonthDays"
                :key="date.value"
                class="day-btn"
                :class="{
                  'other-month': !date.currentMonth,
                  selected: isSelected(date),
                  today: isToday(date),
                }"
                @click="selectDate(date)"
              >
                {{ date.day }}
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <q-btn flat label="CANCEL" no-caps @click="cancel" />
          <q-btn
            unelevated
            color="primary"
            label="Başvuru Yap"
            no-caps
            @click="apply"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { date } from "quasar";

export default defineComponent({
  name: "CalendarPage",

  setup() {
    const currentDate = ref(new Date());
    const nextMonthDate = computed(() => {
      return new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1,
        1
      );
    });

    const selectedStartDate = ref(null);
    const selectedEndDate = ref(null);

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const quickFilters = ref([
      { label: "Bugün", active: false },
      { label: "Dün", active: false },
      { label: "Son 7 Gün", active: false },
      { label: "Son 30 Gün", active: false },
      { label: "Bu Ay", active: false },
      { label: "Geçen Ay", active: false },
    ]);

    const generateMonthDays = (baseDate) => {
      const year = baseDate.getFullYear();
      const month = baseDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const days = [];

      // Previous month days
      const firstDayOfWeek = firstDay.getDay();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = new Date(year, month, -i);
        days.push({
          day: day.getDate(),
          value: day,
          currentMonth: false,
        });
      }

      // Current month days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = new Date(year, month, i);
        days.push({
          day: i,
          value: day,
          currentMonth: true,
        });
      }

      // Next month days
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        const day = new Date(year, month + 1, i);
        days.push({
          day: day.getDate(),
          value: day,
          currentMonth: false,
        });
      }

      return days;
    };

    const firstMonthDays = computed(() => generateMonthDays(currentDate.value));
    const secondMonthDays = computed(() =>
      generateMonthDays(nextMonthDate.value)
    );

    const formatMonth = (date) => {
      const monthNames = [
        "OCA",
        "ŞUB",
        "MAR",
        "NİS",
        "MAY",
        "HAZ",
        "TEM",
        "AĞU",
        "EYL",
        "EKİ",
        "KAS",
        "ARA",
      ];
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    const isSelected = (dateObj) => {
      if (!selectedStartDate.value) return false;
      if (!selectedEndDate.value)
        return isSameDate(dateObj.value, selectedStartDate.value);
      return (
        isSameDate(dateObj.value, selectedStartDate.value) ||
        isSameDate(dateObj.value, selectedEndDate.value)
      );
    };

    const isToday = (dateObj) => {
      return isSameDate(dateObj.value, new Date());
    };

    const isSameDate = (date1, date2) => {
      return (
        date.formatDate(date1, "YYYY-MM-DD") ===
        date.formatDate(date2, "YYYY-MM-DD")
      );
    };

    const selectDate = (dateObj) => {
      if (!selectedStartDate.value || selectedEndDate.value) {
        selectedStartDate.value = dateObj.value;
        selectedEndDate.value = null;
      } else {
        if (dateObj.value < selectedStartDate.value) {
          selectedEndDate.value = selectedStartDate.value;
          selectedStartDate.value = dateObj.value;
        } else {
          selectedEndDate.value = dateObj.value;
        }
      }
    };

    const applyFilter = (filter) => {
      quickFilters.value.forEach((f) => (f.active = false));
      filter.active = true;

      const today = new Date();
      switch (filter.label) {
        case "Bugün":
          selectedStartDate.value = today;
          selectedEndDate.value = today;
          break;
        case "Dün":
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          selectedStartDate.value = yesterday;
          selectedEndDate.value = yesterday;
          break;
        case "Son 7 Gün":
          selectedEndDate.value = today;
          selectedStartDate.value = new Date(
            today.setDate(today.getDate() - 7)
          );
          break;
        case "Son 30 Gün":
          selectedEndDate.value = today;
          selectedStartDate.value = new Date(
            today.setDate(today.getDate() - 30)
          );
          break;
        // Diğer filtreler için benzer mantık
      }
    };

    const previousMonth = () => {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() - 1
      );
    };

    const nextMonth = () => {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1
      );
    };

    const previousNextMonth = () => {
      nextMonth();
    };

    const nextNextMonth = () => {
      nextMonth();
    };

    const cancel = () => {
      selectedStartDate.value = null;
      selectedEndDate.value = null;
      quickFilters.value.forEach((f) => (f.active = false));
    };

    const apply = () => {
      // Seçili tarih aralığını kullanmak için gereken işlemler
      console.log("Selected date range:", {
        start: selectedStartDate.value,
        end: selectedEndDate.value,
      });
    };

    return {
      currentDate,
      nextMonthDate,
      weekDays,
      quickFilters,
      firstMonthDays,
      secondMonthDays,
      formatMonth,
      isSelected,
      isToday,
      selectDate,
      applyFilter,
      previousMonth,
      nextMonth,
      previousNextMonth,
      nextNextMonth,
      cancel,
      apply,
    };
  },
});
</script>

<style scoped>
.calendar-page {
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f3f4f6;
}

.calendar-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  gap: 3rem;
}

.quick-filters {
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-btn {
  justify-content: flex-start !important;
  padding: 8px 0 !important;
  font-size: 1rem !important;
  color: #6366f1 !important;
  min-height: 40px !important;
}

.filter-btn.active {
  background-color: #eef2ff !important;
  color: #4f46e5 !important;
}

.calendar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 3rem;
}

.month-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: space-between;
}

.month-label {
  font-weight: 500;
  color: #374151;
  font-size: 1.1rem;
}

.calendars-wrapper {
  display: flex;
  gap: 3rem;
  margin-bottom: 2rem;
}

.calendar {
  flex: 1;
  min-width: 0;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.day-btn {
  aspect-ratio: 1;
  width: 100%;
  border: none;
  background: #f3f4f6;
  font-size: 1rem;
  color: #374151;
  cursor: pointer;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  height: 40px;
  min-width: 40px;
}

.day-btn:hover {
  background-color: #eef2ff;
}

.day-btn.other-month {
  color: #9ca3af;
  background: transparent;
}

.day-btn.selected {
  background-color: #6366f1;
  color: white;
}

.day-btn.today {
  border: 1px solid #6366f1;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.action-buttons .q-btn {
  padding: 8px 24px !important;
  font-size: 1rem !important;
}
</style>
