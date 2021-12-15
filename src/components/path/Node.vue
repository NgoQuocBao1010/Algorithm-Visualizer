<script setup>
const props = defineProps({
    state: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <div
        class="node-wrapper"
        ondragstart="return false;"
        :class="[state, { animation: state === 'path' }]"
    ></div>
</template>

<style lang="scss" scope>
.node-wrapper {
    flex: 1;
    aspect-ratio: 1 / 1;
    border: 0.01em solid rgb(145, 140, 140);
    border-radius: 5px;

    transition: all 0.2s ease;
    cursor: pointer;

    &.animation {
        animation: bounce 0.4s linear;
    }

    &.start {
        background-color: lightcoral;
    }

    &.end {
        background-color: #59d7f7;
    }

    &.wall {
        background-color: black;
    }

    &.visited {
        background-color: rgb(207, 217, 228);
    }

    &.checking {
        background-color: #ffbcb5;
    }

    &.path {
        background-color: lawngreen;
    }

    @keyframes bounce {
        0% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
}
</style>
