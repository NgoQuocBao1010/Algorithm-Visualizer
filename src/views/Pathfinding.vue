<script setup>
import { onMounted } from "vue";
import Node from "../components/path/Node.vue";

const rows = 20;
const columns = 70;

let matrix = $ref(
    Array(rows)
        .fill()
        .map(() => Array(columns).fill(null))
);
let startNode = $ref(null);
let endNode = $ref(null);

const updateState = (position) => {
    startNode = position;
    const { row, col } = position;
    matrix[row][col] = "start";
};

const becomeWalls = (position) => {
    const { row, col } = position;
    matrix[row][col] = "wall";
};

onMounted(() => {});
</script>

<template>
    <div class="wrapper">
        <div class="matrix-container">
            <div v-for="(_, row) in matrix" :key="row" class="row">
                <Node
                    v-for="(_, col) in matrix[row]"
                    :key="col"
                    :state="matrix[row][col]"
                    @click="updateState({ row, col })"
                    @dragstart="becomeWalls({ row, col })"
                    @dragenter="becomeWalls({ row, col })"
                    @dragover.prevent="becomeWalls({ row, col })"
                />
            </div>
        </div>

        <div class="control-panel">
            {{ startNode }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    margin: 1rem 0;
    width: 100%;

    .matrix-container {
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        .row {
            display: flex;
            .column {
                flex: 1;
                aspect-ratio: 1 / 1;
                border: 0.05em solid rgb(145, 140, 140);
            }
        }
    }
}
</style>
