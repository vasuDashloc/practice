<template>
  <div class="main-div">
    <div class="new-task-form">
      <Taskform />
    </div>
    <div class="button">
      <button class="button1" @click="filter = 'total'">All Task</button>
      <button class="button2" @click="filter = 'favs'">Favorite Task</button>
      <button class="button3" @click="filter = 'completed'">Completed Task</button>
      
    </div>
    <div class="loading" v-if="taskStore.loading">Loading...</div>
    <p v-if="filter === 'total'">
      You have {{ taskStore.totalCount-taskStore.completedCount }} tasks left to do
    </p>
    <p v-if="filter === 'favs'">
      You have {{ taskStore.favCount }} fav tasks left to do
    </p>
    <p v-if="filter === 'completed'">
      You have Completed {{ taskStore.completedCount }} task
    </p>

    <div :class="['taskMaindiv', { scrollable: filteredTasks.length > 4 }]">

      <div class="task-list" v-if="filter === 'total'">
        <div v-for="task in taskStore.total" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>

      <div class="task-list" v-if="filter === 'favs'">
        <div v-for="task in taskStore.favs" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>
      <div class="task-list" v-if="filter === 'completed'">
        <div v-for="task in taskStore.completed" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../store/index.js";

const taskStore = useTaskStore();
// fetch tasks
taskStore.getTasks()
const filter = ref("total");

const filteredTasks = computed(() => {
  if (filter.value === "total") {
    return taskStore.total;
  } else if (filter.value === "favs") {
    return taskStore.favs;
  } else if(filter.value==="completed"){
    return taskStore.completed
  }
  return [];
});
</script>

<style scoped>
.taskMaindiv {
  height: 50vh;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.task-list {
  max-width: 640px;
  margin: 20px auto;
}
.main-div p {
  text-align: center;
  font-weight: 800;
}
.button {
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  gap: 10px;
  justify-content: center;
}
.button button {
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
}

.button1 {
  background: rgb(214, 212, 64);
  border: none;
}
.button1:hover {
  background: rgb(201, 197, 3);
}
.button2 {
  background: rgb(47, 66, 173);
  border: none;
}
.button2:hover {
  background: rgb(2, 25, 160);
  border: none;
}
.button3 {
  background: rgb(65, 187, 65);
  border: none;
}
.button3:hover {
  background: green;
  border: none;
}
.new-task-form {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.loading{
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
</style>
