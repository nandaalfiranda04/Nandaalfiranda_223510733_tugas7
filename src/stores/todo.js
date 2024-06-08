import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    tasks: [],
    newTask: ''
  }),
  actions: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, completed: false });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    toggleTaskCompletion(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
    }
  },
  getters: {
    incompleteTasksCount: (state) => state.tasks.filter(task => !task.completed).length
  }
});
