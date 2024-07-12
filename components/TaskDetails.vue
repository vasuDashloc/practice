<script setup>
import { computed } from 'vue';
import { useTaskStore } from "../store/index.js";

const { task } = defineProps(["task"]);
const taskStore = useTaskStore();

const formattedDate = computed(() => {
  if (task && task.id ) {
    const date = new Date(task.id);
    console.log(date)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return '';
});

</script>

<template>
  <div class="task">
    <div class="taskfirstChild">
      <h3>{{ formattedDate }}</h3>
    <h3 class="title">{{ task.title }}</h3>
    </div>
    <div class="action">
      <div class="actionChild">
      <img
        @click="taskStore.deleteTask(task.id)"
        src="../assets/file.png"
        alt="delete"
      />
      <img
        @click="taskStore.toggleFav(task.id)"
        v-if="!task.isFav"
        src="../assets/heart.svg"
        alt="heart"
      />
      <img
        @click="taskStore.toggleFav(task.id)"
        v-if="task.isFav"
        src="../assets/red-heart.svg"
        alt="heart"
      />
    </div>
    <div>
      <img @click="taskStore.toggleComp(task.id)" v-if="!task.completed" src="../assets/checkBlack.png" alt="blackCheck">
      <img @click="taskStore.toggleComp(task.id)" v-if="task.completed" src="../assets/checkGreen.png" alt="greenCeck">
    </div>
  </div>
    </div>
</template>

<style scoped>
.task {
  display:grid;
  grid-template-columns: 85% 15%;
  align-items: center;
  padding: 6px 20px;
  background: #e5e2e2;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05); 
}

.task h3 {
  color: rgb(78, 77, 77);
  width: 100%; 
  white-space: normal; 
  word-break: break-word; 
  text-align: left;
}

@media (max-width: 550px) {
  .task h3 {
    font-size: 12px; 
    width: 100%; 
    white-space: normal; 
  }
}
.taskfirstChild{
  width: 100%;
  display: grid;
  grid-template-columns: 21% 78%;
  column-gap: 2px;
  
  
}
.action {
  display: flex;
  gap: 10px;
  font-weight: 900;
  cursor: pointer;
  caret-color: green;
}
.actionChild{
  display: flex;
  gap: 10px;
}
.action img {
  height: 20px;
}
.title{
  width: 100%;
  display: flex;
  justify-content: center;
  padding-left: 5%;
}
</style>
