<script setup>
const props = defineProps({
    state: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <div class="node-wrapper" :class="state"></div>
</template>

<style lang="scss" scope>
.node-wrapper {
    flex: 1;
    aspect-ratio: 1 / 1;
    border: 0.05em solid rgb(145, 140, 140);
    border-radius: 5px;
    cursor: pointer;

    &.start {
        background-color: lightblue;
    }

    &.end {
        background-color: lightgreen;
    }

    &.wall {
        background-color: black;
    }
}
</style>
