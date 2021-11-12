<template>
    <!-- Navigation -->
    <Navigation />

    <!-- Sorting -->
    <SortingVisualizer />
</template>

<script setup>
import Navigation from "./components/Navigation.vue";
import SortingVisualizer from "./components/SortingVisualizer.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;700&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
}

#app {
    min-height: 100vh;
}
</style>
