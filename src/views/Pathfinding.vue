<script setup>
import { watch } from "vue";
import { useToast } from "vue-toastification";

import Node from "../components/path/Node.vue";

import pathFinding from "../algorithm/pathfinding.js";

const toast = useToast();

const rows = 12;
const columns = 45;

let board = $ref(
    Array(rows)
        .fill()
        .map(() => Array(columns).fill(null))
);

const clearBoard = () => {
    // Clear the board
    board = Array(rows)
        .fill()
        .map(() => Array(columns).fill(null));
    path = null;

    selectedState = 0;
    startPos = null;
    endPos = null;
};

//  ** Node
let startPos = $ref(null);
let endPos = $ref(null);
watch(
    () => startPos,
    (newVal, oldVal) => {
        if (newVal) {
            if (oldVal) {
                const { row: oldRow, col: oldCol } = oldVal;
                board[oldRow][oldCol] = null;
            }
            const { row, col } = newVal;
            board[row][col] = "start";
        } else {
            const { row: oldRow, col: oldCol } = oldVal;
            board[oldRow][oldCol] = null;
        }
    }
);

watch(
    () => endPos,
    (newVal, oldVal) => {
        if (newVal) {
            if (oldVal) {
                const { row: oldRow, col: oldCol } = oldVal;
                board[oldRow][oldCol] = null;
            }
            const { row, col } = newVal;
            board[row][col] = "end";
        } else {
            const { row: oldRow, col: oldCol } = oldVal;
            board[oldRow][oldCol] = null;
        }
    }
);

// ** Node selection
const nodeStates = ["start", "end", "wall"];
let selectedState = $ref(0);

const updateState = (position) => {
    if (path) clearPath();

    // Select start node
    if (selectedState === 0) {
        startPos = position;
        selectedState = 1;
    } else if (selectedState === 1) {
        // select end node
        endPos = position;
        selectedState = 2;
    } else if (selectedState === 2) {
        // select walls
        const { row, col } = position;
        board[row][col] = "wall";
    }
};

const dragToMakeWalls = (event, position) => {
    if (selectedState !== 2 || event.buttons !== 1) return;

    if (path) clearPath();

    const { row, col } = position;
    board[row][col] = "wall";
};

// ** Visualizer
let path = null;
const startVisualizer = () => {
    if (!startPos || !endPos)
        return toast.warning("Please choose the Start and End node", {
            position: "top-center",
            timeout: 3000,
            hideProgressBar: true,
        });

    const animations = [];
    pathFinding.bfsAlgorithm(board, startPos, endPos, animations);

    animations.forEach((step, index) => {
        setTimeout(() => {
            const { state } = step;
            const { checkingNodes } = step;
            checkingNodes.forEach((node) => {
                const [row, col] = node;
                board[row][col] = state;
            });
            // if (state === "visited") {
            //     const { row, col } = step;
            //     board[row][col] = state;
            // } else if (state === "checking") {
            //     const { checkingNodes } = step;
            //     checkingNodes.forEach((node) => {
            //         const [row, col] = node;
            //         board[row][col] = state;
            //     });
            // }
        }, index * 1);
    });
};

const clearPath = () => {
    // Clear old path
    if (!path) return;

    path.forEach((step, index) => {
        const [row, col] = step;

        if (index === 0) startPos = { row, col };
        else if (index === path.length - 1) {
            endPos = { row, col };
            console.log("fuck end node");
        } else board[row][col] = null;
    });

    path = null;
};
</script>

<template>
    <div class="wrapper">
        <!-- board container -->
        <div class="board-container">
            <div v-for="(_, row) in board" :key="row" class="row">
                <Node
                    v-for="(_, col) in board[row]"
                    :key="col"
                    :state="board[row][col]"
                    @click="updateState({ row, col })"
                    @mouseover="dragToMakeWalls($event, { row, col })"
                    @dragstart="dragToMakeWalls($event, { row, col })"
                    @dragover.prevent="dragToMakeWalls($event, { row, col })"
                    @dragenter.prevent="dragToMakeWalls($event, { row, col })"
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
                <button @click="startVisualizer" class="start">
                    <i class="fas fa-play-circle"></i>Start Visualizer
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    margin: 1rem 0;
    width: 100%;

    .board-container {
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .row {
            display: flex;
            gap: 2px;
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

                &.start {
                    border: 2px solid lightgreen;
                    background: lightgreen;
                    color: #222;
                }

                &:hover {
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
