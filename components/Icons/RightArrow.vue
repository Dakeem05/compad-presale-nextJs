
<template>
    <svg v-if="black" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#fff" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"></path></svg>
    <svg v-if="white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"></path></svg>
  </template>
  
<script setup>
 import {ref} from 'vue';
  const props = defineProps(['fill']);
  let white = ref(false)
  let black = ref(false)

  if(!props.fill) {
    black.value = true;
    white.value = false
  } else if (props.fill) {
    white.value = true
    black.value = false;
  }
</script>
