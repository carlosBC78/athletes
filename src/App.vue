<template>
  <div class="app">
    <header-app></header-app>
    <router-view v-slot="slotProps">
      <transition name="router-transition" mode="out-in"> 
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import HeaderApp from '../src/components/layout/HeaderApp.vue';

export default {
  name: 'App',
  components: {
    HeaderApp
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.app {
  height: 100vh;
  width: 100%;
} 

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.router-transition-enter-from {
    opacity: 0;
    transform: translateY(-30px);
  }
.router-transition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

  .router-transition-enter-active{
    transition: all 0.3s ease-out;
  }
  .router-transition-leave-active{
    transition: all 0.3s ease-in;
  }

  .router-transition-enter-to,
  .router-transition-leave-from {
    opacity: 1;
    transform: translateY(30px);
  }

 
</style>
