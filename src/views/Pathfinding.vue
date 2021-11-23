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
let copyBoard = null;

const clearBoard = () => {
    // Clear the board
    board = Array(rows)
        .fill()
        .map(() => Array(columns).fill(null));

    animations = [];
    selectedState = 0;
    startPos = null;
    endPos = null;

    clearAllTimeout();
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
    if (animations.length > 0) clearPath();

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

    if (animations.length > 0) clearPath();

    const { row, col } = position;
    board[row][col] = "wall";
};

// ** Visualizer
let animations = [];
const timeoutContainers = [];
let animationTime = $ref(1);

const startVisualizer = () => {
    if (!startPos || !endPos)
        return toast.warning("Please choose the Start and End node", {
            position: "top-center",
            timeout: 3000,
            hideProgressBar: true,
        });

    // Copy the old board
    copyBoard = board.map((row) => {
        return row.slice();
    });

    // Start animation
    pathFinding.bfsAlgorithm(board, startPos, endPos, animations);

    console.log(animations.length);

    animations.forEach((step, index) => {
        const { state } = step;

        timeoutContainers.push(
            setTimeout(() => {
                if (state === "visited" || state === "path") {
                    const { row, col } = step;
                    board[row][col] = index === animations.length - 1 ? "end" : state;
                } else if (state === "checking") {
                    const { checkingNodes } = step;
                    checkingNodes.forEach((node) => {
                        const [row, col] = node;
                        board[row][col] = state;
                    });
                }
            }, index * animationTime)
        );
    });
};

const clearPath = () => {
    // Clear old visualizer
    if (animations.length === 0) return;
    board = copyBoard;
    animations = [];
};

const clearAllTimeout = () => {
    for (let i = 0; i < timeoutContainers.length; i++) {
        clearTimeout(timeoutContainers[i]);
    }
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
                <!-- Start Visualizer -->
                <button @click="startVisualizer" class="start">
                    <i class="fas fa-play-circle"></i>Start Visualizer
                </button>

                <!-- Clear board -->
                <button @click="clearBoard" class="clear">
                    <i class="fas fa-chess-board"></i>Clear Board
                </button>

                <!-- Animation time -->
                <div class="slider-container">
                    <label for="time">Animation Length: {{ animationTime }}</label>
                    <input
                        v-model="animationTime"
                        type="range"
                        min="1"
                        max="10"
                        class="slider"
                    />
                </div>
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
        width: 95%;
        margin: 1rem auto;
        display: flex;
        gap: 1rem;

        > * {
            flex: 1;
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 2rem;

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

                    &:hover {
                        background: none;
                        color: #222;
                    }
                }

                &.clear {
                    border: 2px solid lightblue;
                    background: lightblue;
                    color: #222;

                    &:hover {
                        background: none;
                        color: #222;
                    }
                }

                &:hover {
                    background: none;
                    color: lightcoral;
                }

                i {
                    margin-right: 10px;
                }
            }

            .slider-container {
                width: 200px;

                label {
                    font-size: 1.2rem;
                }

                .slider {
                    width: 100%;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
