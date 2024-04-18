<template>
  <section class="container">
    <h1 class="home-clock" v-text="currentTime"></h1>
    <p class="title-lg" :dir="$i18n.locale == 'persian' ? 'rtl' : 'ltr'">{{$t(`good ${time}`)}} {{user}}</p>
  </section>
</template>
  
<script setup>
import useTabTitle from "@/Hooks/UseTabTitle";
import { ref } from "vue";

// tab title
useTabTitle('Dashboard');

// user name
const user = ref(localStorage.getItem("userName") || 'user');

// clock
const hours = ref();
const minutes = ref();
const time = ref();
let currentTime = ref();

const updateCurrentTime = () => {
  hours.value = new Date().getHours();
  minutes.value = new Date().getMinutes();

  hours.value < 10 ? hours.value = `0${hours.value}` : false;
  minutes.value < 10 ? minutes.value = `0${minutes.value}` : false;

  currentTime.value = `${hours.value}:${minutes.value}`;
};

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

//  set message
if ( hours.value < 12 ){
  time.value = 'morning';
} else if ( hours.value < 13 ){
  time.value = 'noon';
} else if ( hours.value < 18 ){
  time.value = 'afternoon';
} else if ( hours.value <= 20 ){
  time.value = 'evening';
} else if ( hours.value > 20 ){
  time.value = 'night';
}
</script>

<style scoped>
.container {
  justify-content: center;
  color: #fff;
}

.home-clock {
  font-family:  'Times New Roman', Times, serif;
  font-size: clamp(90px, 13vw, 130px);
}
</style>