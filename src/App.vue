<script setup>
import Navigation from "./components/Navigation.vue";
</script>

<template>
    <!-- Navigation -->
    <Navigation />

    <router-view />
</template>

<style lang="scss">
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

.slider {
    -webkit-appearance: none;
    width: 200px;
    max-width: 200px;
    height: 25px;
    outline: none;
    opacity: 0.7;
    border: 2px solid #04aa6d;
    border-radius: 1000px;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        background: #04aa6d;
        border-radius: 50%;
        cursor: pointer;
    }
}
</style>
