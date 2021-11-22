<script setup>
import { onMounted } from "vue";
import Node from "../components/path/Node.vue";

const rows = 12;
const columns = 40;

let matrix = $ref(
    Array(rows)
        .fill()
        .map(() => Array(columns).fill(null))
);

const clearBoard = () => {
    // Clear the board
    matrix = Array(rows)
        .fill()
        .map(() => Array(columns).fill(null));
};

let startPos = $ref(null);
let endPos = $ref(null);

const nodeStates = ["start", "end", "wall"];
let selectedState = $ref(0);

const updateState = (position) => {
    // Select start node
    if (selectedState === 0) {
        const { row, col } = position;
        matrix[row][col] = "start";

        if (startPos) {
            const { row: oldRow, col: oldCol } = startPos;
            matrix[oldRow][oldCol] = null;
        }

        startPos = position;
    } else if (selectedState === 1) {
        // select end node
        const { row, col } = position;
        matrix[row][col] = "end";

        if (endPos) {
            const { row: oldRow, col: oldCol } = endPos;
            matrix[oldRow][oldCol] = null;
        }

        endPos = position;
    } else if (selectedState === 2) {
        // select walls
        const { row, col } = position;
        matrix[row][col] = "wall";
    }
};

const dragToMakeWalls = (event, position) => {
    if (selectedState !== 2 || event.buttons !== 1) return;
    const { row, col } = position;
    matrix[row][col] = "wall";
};
</script>

<template>
    <div class="wrapper">
        <!-- Matrix container -->
        <div class="matrix-container">
            <div v-for="(_, row) in matrix" :key="row" class="row">
                <Node
                    v-for="(_, col) in matrix[row]"
                    :key="col"
                    :state="matrix[row][col]"
                    @click="updateState({ row, col })"
                    @mouseover="dragToMakeWalls($event, { row, col })"
                    @dragover.prevent=""
                    @dragenter.prevent=""
                />
            </div>
        </div>

        <!-- Control Panel -->
        <div class="control-panel">
            <!-- Selecting node control -->
            <div class="selecting-node">
                <button
                    :class="{ active: selectedState === 0 }"
                    @click="selectedState = 0"
                >
                    <i class="fas fa-play"></i>Start
                </button>
                <button
                    :class="{ active: selectedState === 1 }"
                    @click="selectedState = 1"
                >
                    <i class="fas fa-flag-checkered"></i>End
                </button>
                <button
                    :class="{ active: selectedState === 2 }"
                    @click="selectedState = 2"
                >
                    <i class="fas fa-skull"></i>Walls
                </button>
            </div>

            <!-- Animation Control -->
            <div class="functions">
                <button @click="clearBoard">
                    <i class="fas fa-chess-board"></i>Clear Board
                </button>
                <button><i class="fas fa-play-circle"></i>Start Algorithm</button>
            </div>
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
        gap: 1px;

        .row {
            display: flex;
            gap: 1px;

            .column {
                flex: 1;
                aspect-ratio: 1 / 1;
                border: 0.05em solid rgb(145, 140, 140);
            }
        }
    }

    .control-panel {
        border: 1px solid black;
        width: 95%;
        margin: 1rem auto;
        display: flex;
        gap: 1rem;

        > * {
            flex: 1;
            display: flex;
            justify-content: space-around;
            padding: 2rem;

            button {
                padding: 0.5em 1.5em;
                font-size: 1.2rem;
                border: none;
                background: none;

                border: 2px solid lightcoral;
                background: lightcoral;
                color: white;

                border-radius: 20px;
                cursor: pointer;
                transition: all 0.15s ease-in;

                &.active {
                    background: none;
                    color: lightcoral;
                }

                &:hover,
                &:focus {
                    background: none;
                    color: lightcoral;
                }

                i {
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>
