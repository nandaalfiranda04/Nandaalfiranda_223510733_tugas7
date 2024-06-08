<template>
  <div class="container mt-3">
    <div class="card">
      <div class="text-center mt-2">
        <h2>Todo List</h2>
      </div>
      <div class="card-body">
        <div class="mt-2">
          <!-- Input form untuk menambah tugas baru -->
          <table class="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Tugas</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" v-model="todoStore.newTask" placeholder="Tambah tugas baru" class="form-control"></td>
                <td>
                  <button class="btn btn-primary" @click="todoStore.addTask">
                    Tambah
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Checkbox untuk menyembunyikan tugas yang selesai -->
        <div class="mt-3">
          <input type="checkbox" id="hideCompleted" v-model="hideCompleted">
          <label for="hideCompleted">Sembunyikan tugas yang sudah selesai</label>
        </div>

        <!-- Tabel untuk menampilkan tugas -->
        <table class="table table-bordered mt-3">
          <thead>
            <tr>
              <th>No</th>
              <th>Tugas</th>
              <th>Status</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in filteredTasks" :key="index">
              <td>{{ index + 1 }}</td>
              <td :class="{ 'text-decoration-line-through': task.completed }">{{ task.text }}</td>
              <td>
                <button type="button" class="btn btn-success" @click="todoStore.toggleTaskCompletion(index)">
                  {{ task.completed ? 'Selesai' : 'Belum Selesai' }}
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger" @click="todoStore.removeTask(index)">Hapus</button>
              </td>
            </tr>
            <tr v-if="filteredTasks.length === 0">
              <td colspan="4">No tasks</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-3">
          <h4>Jumlah tugas yang belum selesai: {{ todoStore.incompleteTasksCount }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useTodoStore } from './stores/todo';

export default {
  name: 'TodoList',
  setup() {
    const todoStore = useTodoStore();
    const hideCompleted = ref(false);

    const filteredTasks = computed(() => {
      return hideCompleted.value
        ? todoStore.tasks.filter(task => !task.completed)
        : todoStore.tasks;
    });

    return {
      todoStore,
      hideCompleted,
      filteredTasks
    };
  }
};
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}

/* CSS untuk input dan tombol */
input[type="text"] {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px;
}

.btn {
  cursor: pointer;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  color: #fff;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  color: #fff;
}

/* CSS untuk tabel */
.table {
  border-radius: 4px;
}

.table thead {
  background-color: #f8f9fa;
}

.table th, .table td {
  border: 1px solid #ced4da;
  padding: 8px;
}

.table th {
  font-weight: bold;
}

.table-bordered {
  border-collapse: collapse;
}

/* CSS untuk judul */
h2 {
  color: #333;
}

/* CSS untuk card */
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
  background-color: #007bff;
  border-radius: 8px 8px 0 0;
  color: #fff;
}

.card-body {
  padding: 20px;
}

/* Centering the container */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
