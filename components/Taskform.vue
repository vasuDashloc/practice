<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="I need to..."
        v-model="newTask"
        aria-label="New Task"
      />
      <button class="add" type="submit">Add</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/index.js';

const taskStore = useTaskStore();

const newTask = ref('');
const errorMessage = ref('');

const handleSubmit = () => {
  if (newTask.value.trim().length === 0) {
    errorMessage.value = 'Please add a task*';
  } else {
    taskStore.addTask({
      title: newTask.value,
      isFav: false,
      completed:false,
      id: new Date()  
    });
    newTask.value = '';
    errorMessage.value = '';
  }
};
</script>

<style scoped>
input {
  padding: 15px 30px;
  outline: none;
  border-radius: 10px;
  border: 2px solid yellow;  
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.add {
  padding: 15px 30px;
  background-color:yellow;
  color:black;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  font-size: 20px;

  cursor: pointer;
}

@media (max-width: 700px) {
  input {
    padding: 10px 6px;
    margin-right: 5px;
    font-size: 15px;
  }
  .add {
    padding: 10px 20px;
    font-size: 15px;
  }
}
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 0.5em;
}
</style>
