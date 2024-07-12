import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
    name: "vasu",
  }),
  getters: {
    total(state) {
      return state.tasks.filter((t) => !t.completed);
    },
    favs(state) {
      return state.tasks.filter((t) => t.isFav && !t.completed);
    },
    favCount(state) {
      return state.tasks.reduce(
        (count, task) => (task.isFav && !task.completed ? count + 1 : count),
        0
      );
    },
    totalCount(state) {
      return state.tasks.length;
    },
    completedCount(state) {
      return state.tasks.reduce(
        (count, task) => (task.completed ? count + 1 : count),
        0
      );
    },
    completed(state) {
      return state.tasks.filter((c) => c.completed);
    },
    incomplete(state) {
      return state.tasks.filter((t) => !t.completed);
    },
  },
  actions: {
    async getTasks() {
      this.loading = true;
      try {
        const res = await fetch("http://localhost:3000/tasks");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        this.tasks = data;
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        this.loading = false;
      }
    },
    async addTask(task) {
      if (!task.id || !task.title) {
        throw new Error("Task must have an id and title");
      }

      try {
        const res = await fetch("http://localhost:3000/tasks", {
          method: 'POST',
          body: JSON.stringify(task),
          headers: { 'Content-type': 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        this.tasks.push(task); // Push the task to state only after a successful response
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    },
    async deleteTask(id) {
      try {
        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        this.tasks = this.tasks.filter((t) => t.id !== id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (!task) {
        throw new Error(`Task with id ${id} not found`);
      }

      try {
        task.isFav = !task.isFav;
        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: 'PATCH',
          body: JSON.stringify({ isFav: task.isFav }),
          headers: { 'Content-type': 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      } catch (error) {
        console.error('Failed to toggle favorite status:', error);
      }
    },
    async toggleComp(id) {
      const task = this.tasks.find((c) => c.id === id);
      if (!task) {
        throw new Error(`Task with id ${id} not found`);
      }

      try {
        task.completed = !task.completed;
        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: 'PATCH',
          body: JSON.stringify({ completed: task.completed }),
          headers: { 'Content-type': 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      } catch (error) {
        console.error('Failed to toggle completion status:', error);
      }
    },
  },
});
