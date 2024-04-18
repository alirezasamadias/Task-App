<template>
  <div class="container">
    <h1 class="title-lg">{{$t("to do")}}</h1>

    <form @submit.prevent="addTodo">
      <div class="form-group">
        <label for="new-todo">{{$t("enter to do")}}</label>
        <input
        id="new-todo"
        v-model="newTodo"
        autocomplete="off"
        :placeholder="$t('new to do')">
      </div>

      <!-- submit btn -->
      <SubmitBtn @submit="addTodo"/>
    </form>

    <div class="subline">
      <h2 class="title-md">{{$t("to do list")}}</h2>
      <!-- delete all todos -->
      <button class="btn delete-all icon-delete" v-if="todos.length != 0" @click="removeAll">{{$t("delete all")}}</button>
    </div>

    <ul class="todos" v-if="todos.length != 0">
      <li
      v-for="(todo, index) in todos"
      :key="index"
      class="todo-item"
      :class="{'hide' : todo.remove}">
        <!-- todo item text  -->
        <span
        :class="{ done: todo.done }"
        @click="doneTodo(todo)"
        v-text="todo.content"
        ></span>

        <!-- todo item btn -->
        <div class="todo-item-btn">
          <button
          @click="editTodo(index)"
          class="btn icon-edit"></button>
            
          <button
          @click="removeTodo(index)"
          class="btn icon-delete"></button>
        </div>
      </li>
    </ul>

    <!-- title empty list -->
    <span v-if="todos.length === 0">{{$t("empty list")}}</span>
  </div>
</template>

<script setup>
import useTabTitle from '@/Hooks/UseTabTitle';
import SubmitBtn from '@/Components/SubmitBtn.vue';
import { ref } from 'vue';

// tab title
useTabTitle('Todo');

const newTodo = ref('');
const defaultData = [{
  done: false,
  content: 'Write a blog post'
}]
const todosData = JSON.parse(localStorage.getItem('todos')) || defaultData;
const todos = ref(todosData);

// add todo
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      remove: false,
      done: false,
      content: newTodo.value
    });
    newTodo.value = '';
  }
  saveData();
}
// done todo
const doneTodo = (todo) => {
  todo.done = !todo.done;
  saveData();
}
// remove todo
const removeTodo = (index) => {
  todos.value[index].remove = true;
  setTimeout(() => {
    todos.value.splice(index, 1);
    saveData();
  }, 500);
}

const removeAll= () => {
  for (const todo of todos.value) {
    todo.remove = true;
  }
  setTimeout(() => {
    todos.value.splice(0, todos.value.length);
    saveData();
  }, 500);
}
// edit todo
const editTodo = (index) => {
  newTodo.value = todos.value[index].content;
  removeTodo(index);
  saveData();
}
// save data in local storage
const saveData = () => {
  const storageData = JSON.stringify(todos.value);
  localStorage.setItem('todos', storageData);
}
</script>

<style>
/* subline for todo list title */
.subline {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  padding-bottom: 8px;
  text-align: left;
  position: relative;
}

.subline::after {
  content: "";
  width: 100%;
  border-top: 2px solid #fff;
  position: absolute;
  top: 100%;
  left: 0;
}

.delete-all {
  display: flex;
  flex-direction: row-reverse;
  column-gap: 5px;
}

/* todos */
.todos {
  width: 100%;
  height: 47vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
  overflow-y: scroll;
  position: relative;
}

/* todos scrollbar */
.todos::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

.todos::-webkit-scrollbar-thumb {
  background-color: #e6e6e6;
}

.todos::-webkit-scrollbar-thumb:hover {
  background-color: #969696;
}

/* todo item */
.todo-item {
  width: 90%;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  border: 2px solid var(--text-dark-color);
  background-color: var(--input-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  transition: 0.5s 0.1s;
}

/* todo item btn */
.todo-item-btn {
  align-self: start;
  display: flex;
  column-gap: 3px;
}

@keyframes shaking {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translateX(3px) rotate(3deg); }
  50% { transform: translate(0, 0) rotate(0eg); }
  75% { transform: translateX(-3px) rotate(-3deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

.icon-delete:active {
  animation: shaking 0.1s infinite;
}

/* Responsive */
@media(max-width:728px) {
  .todos {
    height: 52vh;
  }
}

@media(max-width:425px) {
  .todo-item {
    padding: 6px 10px;
  }

  .todo-item-btn .btn {
    padding: 3px 5px;
    font-size: 16px;
  }
}
</style>