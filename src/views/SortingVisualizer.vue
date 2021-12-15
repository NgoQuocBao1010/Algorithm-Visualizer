<script setup>
import { onMounted, watch } from "vue";

import algorithm from "../algorithm/sorting";

// * Array Container
let arrayContainer = $ref(null);
let containerHeight = $computed(() => arrayContainer.clientHeight);
let containerWidth = $computed(() => arrayContainer.clientWidth);
let barWidth = $ref(5);

const calcBarHeight = (value) => {
    return Math.round((value * containerHeight) / 1000);
};

// * Sort configuaration
let sortConfig = $ref({
    length: 80,
    animationTime: 5,
});
watch(
    () => sortConfig.length,
    () => generateArray()
);

// * Timeout Capture
const timeoutCapture = [];
const clearAllTimeout = () => {
    while (timeoutCapture.length > 0) {
        const timeout = timeoutCapture.pop();
        clearTimeout(timeout);
    }
};

// * Array itself
let array = $ref([]);
const generateArray = () => {
    barWidth = Math.floor(containerWidth / sortConfig.length);

    const bars = document.querySelectorAll("li.element");
    bars.forEach((bar) => {
        bar.style.backgroundColor = "lightcoral";
    });

    clearAllTimeout();

    array = [];
    for (let i = 0; i < sortConfig.length; i++) {
        array.push(generateRandomInt({}));
    }
};

// * Sort algorithm
let sortName = $ref("ms");
watch(
    () => sortName,
    (newVal) => {
        if (newVal === "ms") {
            sortConfig.length = 80;
            sortConfig.animationTime = 5;
        } else if (newVal === "qs") {
            sortConfig.length = 80;
            sortConfig.animationTime = 15;
        }
    }
);

const startSort = () => {
    if (sortName == "qs") quickSort();
    else if (sortName == "ms") mergeSort();
};

const mergeSort = () => {
    /* Trigger merge sort animation */
    if (isSorted(array) || timeoutCapture.length > 0) return;

    const copyArr = [...array];
    const steps = algorithm.doMergeSort(copyArr);

    steps.forEach((step, index) => {
        const bars = document.querySelectorAll("li.element");

        const [barOneIndex, secondVal, action] = step;

        if (action !== "swap") {
            const barOneStyle = bars[barOneIndex].style;
            const barTwoStyle = bars[secondVal].style;

            const color = action === "compare" ? "blue" : "lightcoral";

            timeoutCapture.push(
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, index * sortConfig.animationTime)
            );
        } else {
            timeoutCapture.push(
                setTimeout(() => {
                    const [barOneIndex, val] = step;
                    array[barOneIndex] = val;
                }, index * sortConfig.animationTime)
            );
        }
    });
};

const quickSort = () => {
    if (isSorted(array) || timeoutCapture.length > 0) return;

    const copyArr = [...array];
    const steps = algorithm.doQuickSort(copyArr);

    steps.forEach((step, stepIndex) => {
        const bars = document.querySelectorAll("li.element");

        const { state } = step;
        if (state === "pivot") {
            const { index } = step;
            timeoutCapture.push(
                setTimeout(() => {
                    bars[index].style.backgroundColor = "blue";
                }, stepIndex * sortConfig.animationTime)
            );
        } else if (state === "mark") {
            const { index1, index2 } = step;
            timeoutCapture.push(
                setTimeout(() => {
                    bars[index1].style.backgroundColor = "green";
                    bars[index2].style.backgroundColor = "green";
                }, stepIndex * sortConfig.animationTime)
            );
        } else if (state === "swap") {
            const { index1, index2 } = step;
            timeoutCapture.push(
                setTimeout(() => {
                    swap(index1, index2);
                }, stepIndex * sortConfig.animationTime)
            );
        } else if (state === "invert") {
            const { index1, index2 } = step;
            timeoutCapture.push(
                setTimeout(() => {
                    bars[index1].style.backgroundColor = "lightcoral";
                    bars[index2].style.backgroundColor = "lightcoral";
                }, stepIndex * sortConfig.animationTime)
            );
        }
    });
};

// ** Life cycle hooks
onMounted(() => {
    generateArray();
});

// ** Helper functions
const generateRandomInt = ({ min = 40, max = 900 }) => {
    /* Generate random int between min and max args */
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isSorted = (arr) => {
    /* Check if arr is sorted from small to big */
    const arrLength = arr.length;

    if (arrLength === 1 || arrLength === 0) return true;

    const reduceArr = arr.slice(0, -1);
    return arr[arrLength - 1] >= arr[arrLength - 2] && isSorted(reduceArr);
};

const swap = (pos1, pos2) => {
    const tmp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = tmp;
};
</script>

<template>
    <div class="wrapper">
        <!-- Array Container -->
        <div class="array-container">
            <ul ref="arrayContainer">
                <li
                    class="element"
                    v-for="(value, index) in array"
                    :key="index"
                    :style="{
                        height: `${calcBarHeight(value)}px`,
                        width: `${barWidth}px !important`,
                    }"
                >
                    <span
                        v-if="array.length < 100"
                        class="value"
                        :style="{
                            fontSize: barWidth <= 32 ? `${barWidth / 2}px` : '16px',
                        }"
                    >
                        {{ value }}
                    </span>
                </li>
            </ul>
        </div>

        <div class="control-panel">
            <!-- Picking algorithm -->
            <div class="picking">
                <p>Sort Algorithm:</p>
                <div class="sort-options">
                    <div
                        class="option"
                        :class="{ active: sortName == 'qs' }"
                        @click="sortName = 'qs'"
                    >
                        quick sort
                    </div>
                    <div
                        class="option"
                        :class="{ active: sortName == 'ms' }"
                        @click="sortName = 'ms'"
                    >
                        merge sort
                    </div>
                </div>

                <div v-if="timeoutCapture.length > 0 && !isSorted(array)" class="status">
                    Sorting
                    <div class="spinner">
                        <div class="spinner-item"></div>
                        <div class="spinner-item"></div>
                        <div class="spinner-item"></div>
                        <div class="spinner-item"></div>
                        <div class="spinner-item"></div>
                    </div>
                </div>
            </div>

            <!-- Config -->
            <div class="config">
                <div class="config__setting">
                    <p>Array Length:</p>
                    <input
                        v-model="sortConfig.length"
                        type="range"
                        min="10"
                        max="300"
                        class="slider"
                    />
                </div>

                <div class="config__setting">
                    <p style="width: 250px">
                        Animation time ( {{ sortConfig.animationTime }} ms):
                    </p>
                    <input
                        v-model="sortConfig.animationTime"
                        type="range"
                        min="1"
                        max="50"
                        class="slider"
                    />
                </div>
            </div>

            <div class="control">
                <button @click="generateArray()">Gerenare new Array</button>
                <button @click="startSort()">
                    <i class="fas fa-play-circle"></i> Start Visualizer
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    margin-top: 2rem;
    width: 100%;

    .array-container {
        display: flex;
        justify-content: center;
        align-items: center;

        ul {
            padding: 1rem 10px;
            margin: 1rem 0;
            width: 95%;
            height: 50vh;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-radius: 1.5rem;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
                rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

            li.element {
                list-style: none;
                background: lightcoral;
                height: 100%;
                margin: 0 1px;

                display: flex;
                justify-content: center;
                align-items: center;

                border-top-right-radius: 5px;
                border-top-left-radius: 5px;

                span {
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                }
            }
        }
    }

    .control-panel {
        margin: 2rem;
        padding: 1.2rem;
        display: flex;
        gap: 1rem;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
            rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

        p {
            font-size: 1.2rem;
            width: 200px;
        }

        .picking {
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            gap: 1rem;

            .sort-options {
                display: flex;
                gap: 10px;

                & > * {
                    text-transform: capitalize;
                    padding: 0.4rem 1rem;
                    border-radius: 1000px;
                    cursor: pointer;

                    transition: all 0.3s ease;
                }

                .active {
                    background: rgba(240, 128, 128, 0.9);
                    color: #fff;
                }
            }

            .status {
                padding: 0 1rem;
                margin-left: auto;
                display: flex;
                align-items: center;
                gap: 1rem;
                color: lightcoral;
            }
        }

        .control,
        .config {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin: 1rem 0;

            &__setting {
                display: flex;
                align-items: center;

                p {
                    width: max-content;
                    margin-right: 1rem;
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
            }

            button {
                margin-right: 20px;
                height: 3em;
                width: 11em;
                background: rgb(0, 89, 255);
                color: rgb(255, 255, 255);
                font-size: 1rem;
                border: none;
                border-radius: 5px;
                position: relative;
                background: lightcoral;
                z-index: 1;
                transition: all 0.3s ease-out;

                &:hover {
                    cursor: pointer;

                    &::after {
                        width: 100%;
                    }
                }

                &::after {
                    content: " ";
                    position: absolute;
                    height: 100%;
                    width: 0;
                    background: #04aa6d;
                    right: 0;
                    top: 0;
                    border-radius: 5px;
                    z-index: -1;
                    transition: all 0.3s ease-out;
                }

                i {
                    margin-right: 15px;
                    font-size: 1.2rem;
                }
            }
        }
    }

    .spinner {
        --animation-duration: 1000ms;

        width: 45px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .spinner-item {
            width: calc(45px / 12);
            height: 80%;
            background: var(--clr-spinner);
            animation: spinner1 var(--animation-duration) ease-in-out infinite;

            @keyframes spinner1 {
                50% {
                    transform: scaleY(0.25);
                }
            }
        }

        .spinner-item:nth-child(1) {
            --clr-spinner: lightcoral;
            animation-delay: calc(var(--animation-duration) / 10 * -3);
        }

        .spinner-item:nth-child(2) {
            --clr-spinner: lightcoral;
            animation-delay: calc(var(--animation-duration) / 10 * -1);
        }

        .spinner-item:nth-child(3) {
            --clr-spinner: lightcoral;
            animation-delay: calc(var(--animation-duration) / 10 * -2);
        }

        .spinner-item:nth-child(4) {
            --clr-spinner: lightcoral;
            animation-delay: calc(var(--animation-duration) / 10 * -1);
        }

        .spinner-item:nth-child(5) {
            --clr-spinner: lightcoral;
            animation-delay: calc(var(--animation-duration) / 10 * -3);
        }
    }
}
</style>
