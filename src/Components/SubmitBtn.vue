<template>
    <button 
    @click.prevent="submitActive"
    type="submit"
    class="btn">
        <i class="btn-icon icon-checkmark" :class="{'show-icon' : success}"></i>
        <span class="duration" :class="{'hide' : success}">{{$t("save")}}</span>
    </button>
</template>

<script setup>
import { ref , defineEmits } from 'vue';

const emit = defineEmits(['submit']);

const success = ref();

const submitActive = () => {
    emit('submit')
    // change icon submit btn
    success.value = true;
    setTimeout(() => {
        success.value = false;
    }, 1000);
}
</script>

<style>
.form-group {
    position: relative;
}

.btn-icon {
    opacity: 0;
    padding-bottom: 2px;
    border-radius: inherit;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s , transform 0s;
}
  
.show-icon {
    opacity: 1;
    background-color: green;
}
  
.show-icon::before {
    transform: rotateY(360deg);
    transition-duration: 0.5s;
}
  
.hide {
    opacity: 0;
    visibility: hidden;
}
  
.duration {
    transition-duration: var(--duration-time);
}
</style>