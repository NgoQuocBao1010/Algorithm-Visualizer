<template>
    <Navigation />

    <SortingVisualizer />
</template>

<script>
import Navigation from "./components/Navigation.vue";
import SortingVisualizer from "./components/SortingVisualizer.vue";

export default {
    components: {
        Navigation,
        SortingVisualizer,
    },
    data() {
        return {
            name: "Bao",
        };
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    min-height: 100vh;
}
</style>
