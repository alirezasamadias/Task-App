<template>
  <SiteLoader />
  <!-- header -->
  <header id="header">
    <Header />
  </header>
  <!-- main -->
  <main id="main">
    <router-view></router-view>
  </main>
</template>

<script setup>
// Components
import SiteLoader from './Components/SiteLoader';
import Header from './Parts/Header';
</script>